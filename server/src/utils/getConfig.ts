// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import dotenv from 'dotenv';
import {
  ENV_AZURE_OPENAI_PROMPT_INSTRUCTIONS,
  ENV_AZURE_OPENAI_SERVICE_DEPLOYMENT_MODEL_NAME,
  ENV_AZURE_OPENAI_SERVICE_ENDPOINT,
  ENV_AZURE_OPENAI_SERVICE_KEY,
  ENV_CLIENT_ORIGIN_URL,
  ENV_ENDPOINT_URL,
  ENV_RESOURCE_CONNECTION_STRING,
  ENV_SERVER_CALLBACK_URI
} from '../constants';
import DefaultConfig from '../defaultConfig.json';
import { defaultPrompt } from '../defaultPrompt';

// Load .env file if it exists
dotenv.config();

export interface ServerConfigSettings {
  resourceConnectionString: string;
  endpointUrl: string;
  azureOpenAiServiceKey: string;
  azureOpenAiServiceEndpoint: string;
  azureOpenAiServiceDeploymentModelName: string;
  callbackUri: string;
  clientOriginUrl: string;
  azureOpenAiPromptInstructions: string;
}

export interface ClientConfigSettings {
  resourceConnectionString: string;
  callbackUri: string;
}

export const getServerConfig = (): ServerConfigSettings => {
  // Try to get values from environment variables first, fall back to defaultConfig
  const config: ServerConfigSettings = {
    resourceConnectionString: process.env[ENV_RESOURCE_CONNECTION_STRING] || DefaultConfig.resourceConnectionString,
    endpointUrl: process.env[ENV_ENDPOINT_URL] || DefaultConfig.endpointUrl,
    azureOpenAiServiceKey: process.env[ENV_AZURE_OPENAI_SERVICE_KEY] || DefaultConfig.azureOpenAiServiceKey,
    azureOpenAiServiceEndpoint:
      process.env[ENV_AZURE_OPENAI_SERVICE_ENDPOINT] || DefaultConfig.azureOpenAiServiceEndpoint,
    azureOpenAiServiceDeploymentModelName:
      process.env[ENV_AZURE_OPENAI_SERVICE_DEPLOYMENT_MODEL_NAME] ||
      DefaultConfig.azureOpenAiServiceDeploymentModelName,
    callbackUri: process.env[ENV_SERVER_CALLBACK_URI]?.replace(/\/$/, '') || DefaultConfig.callbackUri.replace(/\/$/, ''),
    clientOriginUrl: process.env[ENV_CLIENT_ORIGIN_URL]?.replace(/\/$/, '') || DefaultConfig.clientOriginUrl.replace(/\/$/, ''),
    azureOpenAiPromptInstructions: process.env[ENV_AZURE_OPENAI_PROMPT_INSTRUCTIONS] || defaultPrompt
  };

  // Optionally, you can add validation to ensure all required fields are present
  const requiredFields: (keyof ServerConfigSettings)[] = [
    'resourceConnectionString',
    'endpointUrl',
    'azureOpenAiServiceKey',
    'azureOpenAiServiceEndpoint',
    'azureOpenAiServiceDeploymentModelName',
    'callbackUri'
  ];

  for (const field of requiredFields) {
    if (!config[field]) {
      console.warn(`Warning: ${field} is not configured. Using empty string.`);
    }
  }

  return config;
};

export const getClientConfig = (): ClientConfigSettings => {
  const config = getServerConfig();
  const serverConfig = {
    resourceConnectionString: config.resourceConnectionString,
    callbackUri: config.callbackUri
  };
  return serverConfig;
};
