// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as express from 'express';
import { CommunicationIdentityClient, TokenScope } from '@azure/communication-identity';

export const tokenController = (client: CommunicationIdentityClient) => {
  return async (_req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const scopes: TokenScope[] = ['voip'];
    let tokenResponse;

    try {
      tokenResponse = await client.createUserAndToken(scopes);
    } catch (error) {
      return next(error);
    }

    res.status(200).json(tokenResponse);
  };
};
