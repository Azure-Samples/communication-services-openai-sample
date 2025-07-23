// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import createError from 'http-errors';
import logger from 'morgan';
import path from 'path';
import http from 'http';
import WebSocket from 'ws';

import { initWebsocket } from './utils/azureOpenAiService';
import { processWebsocketMessageAsync } from './utils/mediaStreamingHandler';

import issueToken from './routes/issueToken';
import refreshToken from './routes/refreshToken';
import getEndpointUrl from './routes/getEndpointUrl';
import callAutomationEvent from './routes/callAutomationEvent';
import createGroupCallWithAutomation from './routes/createGroupCallWithAutomation';

// Import the new SSE router
import agentStatusEventsRouter from './routes/agentStatusEvents';
import callAutomationEventRouter from './routes/callAutomationEvent';
import { CommunicationIdentityClient } from '@azure/communication-identity';
import getClientConfig from './routes/getClientConfig';
import { getServerConfig } from './utils/getConfig';
import { tokenController } from './controllers/tokenController';

const app = express();

const allowedOrigins = [
  "http://localhost:3000", // Example: add your frontend URL here
  getServerConfig().clientOriginUrl
  
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (
      origin.startsWith('https://') &&
      origin.endsWith('.app.github.dev')
    ) {
      return callback(null, true);
    }
    const normalizedOrigin = origin.replace(/\/$/, '');
    if (!allowedOrigins.map(o => o.replace(/\/$/, '')).includes(normalizedOrigin)) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use(logger('tiny'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'build')));

// Add this to your route registrations
app.use('/createGroupCallWithAutomation', createGroupCallWithAutomation);

app.use('/api/config', getClientConfig);

app.use('/callAutomationEvent', callAutomationEvent);

// Register existing routes
app.use('/api/callAutomationEvents', callAutomationEventRouter);

// Register the new SSE route
app.use('/api/agentStatusEvents', agentStatusEventsRouter);

/**
 * route: /refreshToken
 * purpose: Chat,Calling: get a new token
 */
app.use('/refreshToken', cors(), refreshToken);

/**
 * route: /getEndpointUrl
 * purpose: Chat,Calling: get the endpoint url of ACS resource
 */
app.use('/getEndpointUrl', cors(), getEndpointUrl);

/**
 * route: /token
 * purpose: Chat,Calling: get ACS token with the given scope
 */
app.use('/token', cors(), issueToken);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const identityClient = new CommunicationIdentityClient(getServerConfig().resourceConnectionString);

app.get('/api/token', tokenController(identityClient));

const port = parseInt('8080');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Websocket for receiving mediastreaming
 */
const wss = new WebSocket.Server({ server });

wss.on('connection', async (ws: WebSocket) => {
  console.log('WebSocket connection established');

  ws.on('open', () => {
    // Note: 'open' event is for client-side WebSockets. For 'ws' server, connection is already open here.
    console.log('WebSocket connection is open and ready.');
  });

  try {
    await initWebsocket(ws);
  } catch (error) {
    console.error('Error during WebSocket initialization or starting conversation:', error);
    ws.close(1011, 'Initialization error'); // 1011: Internal Error
    return;
  }

  ws.on('message', async (packetData: ArrayBuffer) => {
    try {
      if (ws.readyState === WebSocket.OPEN) {
        await processWebsocketMessageAsync(packetData);
      } else {
        console.warn(`WebSocket message received, but socket readyState is: ${ws.readyState}`);
      }
    } catch (error) {
      console.error('Error processing WebSocket message:', error);
      // Optionally, send an error message back to the client if appropriate
      // ws.send(JSON.stringify({ type: 'error', message: 'Error processing your message.' }));
    }
  });

  ws.on('close', (code, reason) => {
    console.log(
      `WebSocket connection closed. Code: ${code}, Reason: ${reason ? reason.toString() : 'No reason given'}`
    );
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  // It's good practice to confirm connection to the client.
  // Ensure the client expects this message format.
  ws.send(JSON.stringify({ type: 'connection_ack', message: 'Welcome to the WebSocket server!' }));
});

export default server;
