// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface AppConfigModel {
  resourceConnectionString: string;
  callbackUri: string;
}

/**
 * Get ACS user token from the Contoso server.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchTokenResponse = async (): Promise<any> => {
  const response = await fetch('/token?scope=voip');
  if (response.ok) {
    const responseAsJson = await response.json();
    const token = responseAsJson.token;
    if (token) {
      return responseAsJson;
    }
  }
  throw new Error('Invalid token response');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchConfig = async (): Promise<any> => {
  const response = await fetch('/api/config', { method: 'GET' });
  if (response.ok) {
    const responseAsJson = await response.json();
    const callbackUri = responseAsJson.callbackUri;
    if (callbackUri) {
      return responseAsJson as AppConfigModel;
    }
  }
  throw new Error('Invalid config response');
};
