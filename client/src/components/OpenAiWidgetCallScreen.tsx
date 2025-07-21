// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CallProvider } from '@azure/communication-react';
import { Stack } from '@fluentui/react';
import * as styles from '../styles/OpenAiWidget.styles';
import { Call } from '@azure/communication-calling';
import { OpenAiControlBar } from './OpenAiControlBar';
import { LogoIcon } from './constants';

interface OpenAiWidgetCallScreenProps {
  currentCall: Call;
  onHangup: () => void;
}

export const OpenAiWidgetCallScreen = ({ currentCall, onHangup }: OpenAiWidgetCallScreenProps): JSX.Element => {
  const currentPulsatingLogoWrapperStyle = { ...styles.cardPulsatingLogoWrapperStyle, animation: 'pulse 2s infinite' };

  return (
    <CallProvider call={currentCall}>
      <Stack style={styles.agentSpeakingCardStyle}>
        <Stack style={currentPulsatingLogoWrapperStyle}>
          <LogoIcon size={50} />
        </Stack>
        <p style={styles.cardAgentSpeakingTextStyleContoso}>Contoso</p>
        <p style={styles.cardAgentSpeakingTextStyleStatus}>Connected</p>
        <OpenAiControlBar onHangup={onHangup} />
      </Stack>
    </CallProvider>
  );
};
