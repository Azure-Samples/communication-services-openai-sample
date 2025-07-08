// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as express from 'express';
import { getServerConfig } from '../utils/getConfig';

const router = express.Router();

/**
 * route: /getEndpointUrl/
 *
 * purpose: Get the endpoint url of Azure Communication Services resource.
 *
 * @returns The endpoint url as string
 *
 */

router.get('/', async function (req, res) {
  res.send(getServerConfig().endpointUrl);
});

export default router;
