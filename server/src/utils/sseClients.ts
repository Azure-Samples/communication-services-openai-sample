// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Response } from 'express';

interface Client {
  id: string;
  res: Response;
}

let clients: Client[] = [];

export function addSseClient(res: Response): string {
  const clientId = Date.now().toString() + Math.random().toString(36).substring(2);
  const newClient = { id: clientId, res };
  clients.push(newClient);
  console.log(`[SSE] Client connected: ${clientId}. Total clients: ${clients.length}`);

  // Remove client on connection close
  res.on('close', () => {
    clients = clients.filter((client) => client.id !== clientId);
    console.log(`[SSE] Client disconnected: ${clientId}. Total clients: ${clients.length}`);
  });
  return clientId;
}

export function broadcastAgentConnectedStatus(isConnected: boolean): void {
  if (clients.length === 0) {
    console.log('[SSE] No clients connected, skipping broadcast.');
    return;
  }

  console.log(`[SSE] Broadcasting agent connected status: ${isConnected} to ${clients.length} client(s)`);
  const eventPayload = JSON.stringify({ type: 'agentConnectedStatus', data: { isConnected } });

  clients.forEach((client) => {
    try {
      client.res.write(`data: ${eventPayload}\n\n`);
    } catch (error) {
      console.error(`[SSE] Error writing to client ${client.id}:`, error);
      // Optionally, remove problematic client here if write fails consistently
    }
  });
}
