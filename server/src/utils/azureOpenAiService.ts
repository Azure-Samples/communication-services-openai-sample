// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import WebSocket from 'ws';
import * as rtClient from 'rt-client';
import { config } from 'dotenv';
import { OutStreamingData } from '@azure/communication-call-automation';
import { getServerConfig } from './getConfig';
import { broadcastAgentConnectedStatus } from './sseClients';

config();

let ws: WebSocket;

const openAiServiceEndpoint = getServerConfig().azureOpenAiServiceEndpoint || '';
const openAiKey = getServerConfig().azureOpenAiServiceKey || '';
const openAiDeploymentModel = getServerConfig().azureOpenAiServiceDeploymentModelName || '';

const answerPromptSystemTemplate = getServerConfig().azureOpenAiPromptInstructions || `You are an AI assistant that helps people find information.`;

let realtimeStreaming: rtClient.LowLevelRTClient;

export async function sendAudioToExternalAi(data: string): Promise<void> {
  try {
    const audio = data;
    if (audio) {
      await realtimeStreaming.send({
        type: 'input_audio_buffer.append',
        audio: audio
      });
    }
  } catch (e) {
    console.log(e);
  }
}

export async function startConversation(): Promise<void> {
  console.log('[AzureOpenAIService] Starting conversation...');
  await startRealtime(openAiServiceEndpoint, openAiKey, openAiDeploymentModel);
  console.log('[AzureOpenAIService] Conversation started.');
}

async function startRealtime(endpoint: string, apiKey: string, deploymentOrModel: string): Promise<void> {
  try {
    realtimeStreaming = new rtClient.LowLevelRTClient(new URL(endpoint), { key: apiKey }, { deployment: deploymentOrModel });
    console.log('sending session config');
    await realtimeStreaming.send(createConfigMessage());
    console.log('sent');
  } catch (error) {
    console.error('Error during startRealtime:', error);
  }

  setImmediate(async () => {
    try {
      await handleRealtimeMessages();
    } catch (error) {
      console.error('Error handling real-time messages:', error);
    }
  });
}

function createConfigMessage(): rtClient.SessionUpdateMessage {
  const configMessage: rtClient.SessionUpdateMessage = {
    type: 'session.update',
    session: {
      instructions: answerPromptSystemTemplate,
      voice: 'shimmer',
      input_audio_format: 'pcm16',
      output_audio_format: 'pcm16',
      turn_detection: {
        type: 'server_vad'
      },
      input_audio_transcription: {
        model: 'whisper-1'
      }
    }
  };

  return configMessage;
}

export async function handleRealtimeMessages(): Promise<void> {
  for await (const message of realtimeStreaming.messages()) {
    console.log('Message type:', message.type);
    switch (message.type) {
      case 'session.created':
        broadcastAgentConnectedStatus(true);
        console.log('session started with id:-->' + message.session.id);
        break;
      case 'response.audio_transcript.delta':
        break;
      case 'response.audio.delta':
        await receiveAudioForOutbound(message.delta);
        break;
      case 'input_audio_buffer.speech_started':
        console.log(`Voice activity detection started at ${message.audio_start_ms} ms`);
        stopAudio();
        break;
      case 'conversation.item.input_audio_transcription.completed':
        console.log(`User:- ${message.transcript}`);
        break;
      case 'response.audio_transcript.done':
        console.log(`AI:- ${message.transcript}`);
        break;
      case 'response.done':
        console.log(message.response.status);
        break;
      default:
        console.log('Unknown message type received:', message.type);
        break;
    }
  }
}

export async function initWebsocket(socket: WebSocket): Promise<void> {
  ws = socket;
}

async function stopAudio(): Promise<void> {
  try {
    const jsonData = OutStreamingData.getStopAudioForOutbound();
    sendMessage(jsonData);
  } catch (e) {
    console.log(e);
  }
}
async function receiveAudioForOutbound(data: string): Promise<void> {
  try {
    const jsonData = OutStreamingData.getStreamingDataForOutbound(data);
    sendMessage(jsonData);
    console.log('send message for outbound audio:-->');
  } catch (e) {
    console.log(e);
  }
}

export async function closeOpenAiService(): Promise<void> {
  if (realtimeStreaming) {
    realtimeStreaming.close();
    console.log('OpenAI service connection closed.');
  }
}

async function sendMessage(data: string): Promise<void> {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(data);
  } else {
    console.log('socket connection is not open.');
  }
}
