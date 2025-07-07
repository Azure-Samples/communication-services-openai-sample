import * as express from 'express';
import { closeOpenAiService, startConversation } from '../utils/azureOpenAiService';
import { broadcastAgentConnectedStatus } from '../utils/sseClients';

const router = express.Router();

router.post('/', async (req: any, res: any) => {
  const event = req.body[0];
  if (!event || !event.data) {
    console.error('[CallAutomationEvents] Received invalid event structure:', req.body);
    return res.status(400).send('Invalid event structure');
  }
  const eventData = event.data;
  const callConnectionId = eventData.callConnectionId;
  console.log(
    `Received Event:-> ${event.type}, Correlation Id:-> ${eventData.correlationId}, CallConnectionId:-> ${callConnectionId}`
  );

  if (event.type === 'Microsoft.Communication.CallConnected') {
    console.log('[CallAutomationEvents] Call connected event received.');
    console.log(`Operation context:--> ${eventData.operationContext}`);
    console.log(`Call connection ID:--> ${callConnectionId}`);
    // Start the conversation with OpenAI service
    await startConversation(callConnectionId);
    broadcastAgentConnectedStatus(true); // Notify that the agent is connected
  } else if (event.type === 'Microsoft.Communication.MediaStreamingStarted') {
    console.log(`Operation context:--> ${eventData.operationContext}`);
    console.log(`Media streaming content type:--> ${eventData.mediaStreamingUpdate.contentType}`);
    console.log(`Media streaming status:--> ${eventData.mediaStreamingUpdate.mediaStreamingStatus}`);
    console.log(`Media streaming status details:--> ${eventData.mediaStreamingUpdate.mediaStreamingStatusDetails}`);
  } else if (event.type === 'Microsoft.Communication.MediaStreamingStopped') {
    console.log(`Operation context:--> ${eventData.operationContext}`);
    console.log(`Media streaming content type:--> ${eventData.mediaStreamingUpdate.contentType}`);
    console.log(`Media streaming status:--> ${eventData.mediaStreamingUpdate.mediaStreamingStatus}`);
    console.log(`Media streaming status details:--> ${eventData.mediaStreamingUpdate.mediaStreamingStatusDetails}`);
  } else if (event.type === 'Microsoft.Communication.MediaStreamingFailed') {
    console.log(`Operation context:--> ${eventData.operationContext}`);
    console.log(`Code:->${eventData.resultInformation.code}, Subcode:->${eventData.resultInformation.subCode}`);
    console.log(`Message:->${eventData.resultInformation.message}`);
  } else if (event.type === 'Microsoft.Communication.CallDisconnected') {
    console.log('[CallAutomationEvents] Call disconnected. Ensuring agent status is not speaking.');
    closeOpenAiService();
    broadcastAgentConnectedStatus(false);
  } else if (event.type === 'Microsoft.Communication.ParticipantsUpdated') {
    console.log('Participant info', eventData.participants);
    console.log('Participant updated event received.');
  } else {
    console.log(`[CallAutomationEvents] Unhandled event type: ${event.publicEventType}`);
  }

  // It's crucial to send a response to acknowledge the webhook.
  res.sendStatus(200);
});

export default router;
