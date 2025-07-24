// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CallAutomationClient, CallLocator, MediaStreamingOptions } from '@azure/communication-call-automation';
import { getServerConfig } from './getConfig';

/**
 * Call automation client is used to connect to the call automation service.
 * This is used to start and stop transcription.
 */
let callAutomationClient: CallAutomationClient | undefined = undefined;

/**
 * Function to get the call automation client.
 * This is used to connect to the call automation service and start transcription.
 * @returns the call automation client
 */
export const getCallAutomationClient = (): CallAutomationClient =>
  // there is a second param fro CallAutomationClient construction that lets you pass in a user identifier
  callAutomationClient ?? (callAutomationClient = new CallAutomationClient(getServerConfig().resourceConnectionString));

/**
 * Function to connect a new group call with call automation.
 * @param groupId - the id of the group to connect to
 * @returns void
 */
export const connectGroupCallAutomation = async (serverCallId: string): Promise<void> => {
  let websocketUrl = getServerConfig().callbackUri.replace(/^https:\/\//, 'wss://');
  websocketUrl = websocketUrl.replace(/\/$/, '');

  const mediaStreamingOptions: MediaStreamingOptions = {
    transportUrl: websocketUrl + '/',
    transportType: 'websocket',
    contentType: 'audio',
    audioChannelType: 'unmixed',
    startMediaStreaming: true,
    enableBidirectional: true,
    audioFormat: 'Pcm24KMono'
  };
  const options = {
    mediaStreamingOptions
  };

  const callbackUri = `${getServerConfig().callbackUri}/callAutomationEvent`;

  const automationClient = getCallAutomationClient();

  const groupCallLocator: CallLocator = {
    kind: 'serverCallLocator',
    id: serverCallId
  };
  await automationClient.connectCall(groupCallLocator, callbackUri ?? '', options);
  console.log('Group call joined with call automation');
};
