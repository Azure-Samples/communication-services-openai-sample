// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as express from 'express';;
import { getClientConfig } from '../utils/getConfig';

const router = express.Router();

router.get('/', async function (req, res) {
  res.send(getClientConfig());
});

export default router;