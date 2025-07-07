// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { useState, useEffect, useRef, SetStateAction, Dispatch } from 'react';
import { FullscreenAgentView } from './FullscreenAgentView';
import * as styles from '../styles/OpenAiWidget.styles';
import { Call } from '@azure/communication-calling';
import { connectCallAutomationToGroupCall } from '../utils/callAutomationUtils';
import {
  CallProvider,
  DeclarativeCallAgent,
  StatefulCallClient,
  createStatefulCallClient,
  CallAgentProvider,
  CallClientProvider
} from '@azure/communication-react';
import { OpenAiWidgetCallScreen } from './OpenAiWidgetCallScreen';
import { v1 as createGUID } from 'uuid';
import { LogoIcon, VideoIcon } from './constants';
import { Stack } from '@fluentui/react';
import { AzureCommunicationTokenCredential, CommunicationUserIdentifier } from '@azure/communication-common';
import { AppConfigModel, fetchConfig, fetchTokenResponse } from '../utils/AppUtils';

export const OpenAiWidget = (props: { setIsOpenCallback: Dispatch<SetStateAction<boolean>> }): JSX.Element => {
  const { setIsOpenCallback } = props;
  const [callAgent, setCallAgent] = useState<DeclarativeCallAgent>();
  const [statefulCallClient, setStatefulCallClient] = useState<StatefulCallClient>();
  const [tokenCredential, setTokenCredential] = useState<AzureCommunicationTokenCredential>();
  const [userIdentifier, setUserIdentifier] = useState<CommunicationUserIdentifier>();

  const [isAgentSpeakingViewActive, setIsAgentSpeakingViewActive] = useState(false); // Renamed for clarity
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentCall, setCurrentCall] = useState<Call | undefined>(undefined);
  const [clientConfig, setClientConfig] = useState<AppConfigModel>();
  const callAutomationStarted = useRef(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const config = await fetchConfig();
        setClientConfig(config);
      } catch (error) {
        console.error('Error fetching configuration:', error);
      }
    };
    fetchData();
  }, []);

  // Effect for Server-Sent Events
  useEffect(() => {
    if (!currentCall || !clientConfig) {
      return;
    }
    const eventSource = new EventSource(`${clientConfig?.callbackUri}/api/agentStatusEvents`); // Ensure this path is correct
    eventSource.onmessage = (event) => {
      try {
        const serverEvent = JSON.parse(event.data);
        if (serverEvent.type === 'agentConnectedStatus') {
          console.log('SSE: Agent connected status from server:', serverEvent.data);
          const { isConnected } = serverEvent.data;
          setIsLoading(!isConnected);
        }
      } catch (error) {
        console.error('SSE: Error parsing message data:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE: EventSource failed:', error);
    };

    return () => {
      console.log('SSE: Closing EventSource connection.');
      eventSource.close();
    };
  }, [currentCall, clientConfig]); // Re-run effect if isAgentSpeakingViewActive changes

  const simulateServerRequest = (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const { token, user } = await fetchTokenResponse();
        console.log('Token fetched: ', token);
        console.log('User fetched: ', user);
        setUserIdentifier(user);
        setTokenCredential(new AzureCommunicationTokenCredential(token));
      } catch (e) {
        console.error(e);
      }
    })();
  }, [setUserIdentifier]);

  useEffect(() => {
    if (statefulCallClient === undefined) {
      if (!userIdentifier) {
        return;
      }
      const statefulClient = createStatefulCallClient({ userId: userIdentifier });
      setStatefulCallClient(statefulClient);
    }
    console.log('Stateful client created', statefulCallClient);
  }, [userIdentifier, setStatefulCallClient, statefulCallClient]);

  useEffect(() => {
    if (callAgent === undefined && statefulCallClient && tokenCredential) {
      const createCallAgent = async (): Promise<void> => {
        const callAgent = await statefulCallClient.createCallAgent(tokenCredential);
        setCallAgent(callAgent);
      };
      createCallAgent();
    }
  }, [callAgent, statefulCallClient, tokenCredential]);

  useEffect(() => {
    currentCall?.on('stateChanged', () => {
      if (currentCall?.state === 'Connected') {
        if (!callAutomationStarted.current) {
          callAutomationStarted.current = true;
          try {
            console.log('Connecting to call automation...');
            connectCallAutomationToGroupCall(currentCall);
          } catch (e) {
            console.error('Error connecting to call automation:', e);
            callAutomationStarted.current = false;
          }
        }
      }
      if (currentCall?.state === 'Disconnected') {
        console.log('Call ended, resetting state.');
        setIsAgentSpeakingViewActive(false); // Reset when call ends
        setIsFullscreen(false); // Reset fullscreen state
        setCurrentCall(undefined); // Clear the current call
        callAutomationStarted.current = false;
      }
      console.log('Current call state:', currentCall?.state);
    });
  }, [currentCall, setCurrentCall]);

  const handleGetAdviceClick = async (): Promise<void> => {
    console.log('Starting call with agent...');

    const callTemp = callAgent?.join({ groupId: createGUID() });
    setCurrentCall(callTemp);
    setIsLoading(true);
    const success = await simulateServerRequest();
    console.log('Successfully created a call');
    console.log('StatefulCallClient:', statefulCallClient);
    console.log('CallAgent:', callAgent);
    if (success) {
      setIsAgentSpeakingViewActive(true); // Activate the agent speaking view
    } else {
      alert("Sorry, we couldn't connect to the expert right now.");
    }
  };

  const closeAll = (): void => {
    setIsFullscreen(false);
    setIsAgentSpeakingViewActive(false); // Deactivate the agent speaking view
    setIsOpenCallback(false);
    currentCall?.hangUp(); // Hang up the call if it exists
  };

  const handleExitFullscreen = (): void => {
    setIsFullscreen(false);
  };

  if (isAgentSpeakingViewActive && statefulCallClient && currentCall && !isLoading) {
    return (
      <CallClientProvider callClient={statefulCallClient}>
        <CallAgentProvider callAgent={callAgent}>
          <CallProvider call={currentCall}>
            {isFullscreen ? (
              <FullscreenAgentView onClose={closeAll} onExitFullscreen={handleExitFullscreen} />
            ) : (
              <OpenAiWidgetCallScreen
                currentCall={currentCall}
                onFullscreen={() => setIsFullscreen(true)}
                onHangup={closeAll}
              />
            )}
          </CallProvider>
        </CallAgentProvider>
      </CallClientProvider>
    );
  }

  // Default: "Talk to an expert" card
  return (
    <div style={styles.expertCardStyle}>
      <button onClick={() => setIsOpenCallback(false)} style={styles.closeButtonStyle} aria-label="Close widget">
        &times;
      </button>
      <Stack style={styles.cardPulsatingLogoWrapperStyle}>
        <LogoIcon size={50} />
      </Stack>
      <h2 style={styles.titleStyle}>Talk to an expert</h2>
      <p style={styles.subtitleStyle}>Get advice and find your perfect product.</p>
      <button
        style={{
          ...styles.getAdviceButtonStyle,
          ...(isLoading && styles.getAdviceButtonLoadingStyle),
          ...(!callAgent && styles.getAdviceButtonDisabledStyle)
        }}
        onClick={handleGetAdviceClick}
        disabled={!callAgent || isLoading}
      >
        {isLoading ? (
          'Connecting...'
        ) : !callAgent ? (
          'Initializing...'
        ) : (
          <>
            <VideoIcon /> Get advice
          </>
        )}
      </button>
    </div>
  );
};
