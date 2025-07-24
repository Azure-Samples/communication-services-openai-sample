// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Call } from '@azure/communication-calling';

/**
 * Connects call automation to an existing group call
 * @param serverCallId - The server call ID from the established call
 * @returns Promise that resolves when call automation is connected
 */
export const connectCallAutomationToGroupCall = async (call: Call): Promise<boolean> => {
  if (call.info !== undefined && call.state === 'Connected') {
    const serverCallID = await call.info.getServerCallId();
    const response = await fetch('/joinGroupCallWithAutomation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        serverCallId: serverCallID
      })
    });
    if (!response.ok) {
      throw new Error('Failed to start call with call automation: ' + response.statusText);
    }
    return true;
  }
  return false;
};
