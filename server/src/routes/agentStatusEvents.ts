// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as express from 'express';
import { addSseClient } from '../utils/sseClients';

const router = express.Router();

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Important for proxy servers and Azure App Service
  res.setHeader('X-Accel-Buffering', 'no');

  // Ensure all browsers get proper encoding
  res.setHeader('Content-Encoding', 'identity');
  res.flushHeaders(); // Important to send headers immediately

  addSseClient(res);
});

export default router;
