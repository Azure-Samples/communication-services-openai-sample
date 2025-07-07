import * as express from 'express';
import { addSseClient } from '../utils/sseClients';

const router = express.Router();

router.get('/', (req, res) => {
  // Set headers required for SSE to work properly
  // Access control allow origin can be set when testing locally. But in production,
  // it should be set to the actual client URL or not set at all.
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
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
