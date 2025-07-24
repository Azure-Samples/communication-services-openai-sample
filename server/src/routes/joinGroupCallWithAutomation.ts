// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as express from 'express';
import { connectGroupCallAutomation } from '../utils/callAutomationUtils';

const router = express.Router();

interface JoinGroupCallParam {
  serverCallId: string;
}

/**
 * route: /joinGroupCallWithAutomation
 *
 * purpose: Join a group call with call automation
 *
 * @param serverCallId: id of the group to join a call for
 */
router.post('/', async function (req, res) {
  const param: JoinGroupCallParam = req.body;

  try {
    await connectGroupCallAutomation(param.serverCallId);
    res.status(200).send({ success: true });
  } catch (error) {
    console.error('Error joining group call with automation:', error);
    res.status(500).send({ error: 'Failed to join group call with automation' });
  }
});

export default router;
