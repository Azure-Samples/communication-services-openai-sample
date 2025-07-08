// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as express from 'express';
import { connectGroupCallAutomation } from '../utils/callAutomationUtils';

const router = express.Router();
interface CreateGroupCallParam {
  serverCallId: string;
}

/**
 * route: /createGroupCallWithAutomation
 *
 * purpose: Create a group call with call automation
 *
 * @param groupId: id of the group to create a call for
 */
router.post('/', async function (req, res) {
  const param: CreateGroupCallParam = req.body;

  try {
    await connectGroupCallAutomation(param.serverCallId);
    res.status(200).send({ success: true });
  } catch (error) {
    console.error('Error creating group call with automation:', error);
    res.status(500).send({ error: 'Failed to create group call with automation' });
  }
});

export default router;
