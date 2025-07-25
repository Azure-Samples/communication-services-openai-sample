// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CommunicationAccessToken,
  CommunicationIdentityClient,
  CommunicationUserToken,
  TokenScope
} from '@azure/communication-identity';
import { CommunicationUserIdentifier } from '@azure/communication-common';
import { getServerConfig } from './getConfig';

// lazy init to allow mocks in test
let identityClient: CommunicationIdentityClient | undefined = undefined;
const getIdentityClient = (): CommunicationIdentityClient =>
  identityClient ?? (identityClient = new CommunicationIdentityClient(getServerConfig().resourceConnectionString));

/**
 * Retrieves a CommunicationAccessToken for the admin user with the specified scopes.
 *
 * @param scopes - The scopes for which the token is requested.
 * @param user - The CommunicationUserIdentifier for which the token is requested.
 * @returns A promise that resolves to a CommunicationAccessToken.
 */
export const getToken = (
  user: CommunicationUserIdentifier,
  scopes: TokenScope[]
): Promise<CommunicationAccessToken> => {
  const scope = scopes ?? ['voip'];
  return getIdentityClient().getToken(user, scope);
};

/**
 * Creates a new CommunicationUserIdentifier and a CommunicationUserToken for the admin user with the specified scopes.
 *
 * @param scopes - The scopes for which the token is requested.
 * @returns A promise that resolves to a CommunicationUserToken.
 */
export const createUserAndToken = (scopes: TokenScope[]): Promise<CommunicationUserToken> => {
  const scope = scopes ?? ['voip'];
  return getIdentityClient().createUserAndToken(scope);
};
