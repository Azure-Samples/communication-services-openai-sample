// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CallProvider } from '@azure/communication-react';
import { Stack } from '@fluentui/react';
import * as styles from '../styles/OpenAiWidget.styles';
import { Call } from '@azure/communication-calling';
import { OpenAiControlBar } from './OpenAiControlBar';
import { FullscreenEnterIcon, LogoIcon } from './constants';

interface OpenAiWidgetCallScreenProps {
  currentCall: Call;
  onFullscreen: () => void;
  onHangup: () => void;
}

export const OpenAiWidgetCallScreen = ({
  currentCall,
  onFullscreen,
  onHangup
}: OpenAiWidgetCallScreenProps): JSX.Element => {
  const currentPulsatingLogoWrapperStyle = { ...styles.cardPulsatingLogoWrapperStyle, animation: 'pulse 2s infinite' };

  return (
    <CallProvider call={currentCall}>
      <Stack style={styles.agentSpeakingCardStyle}>
        <button style={styles.fullscreenButtonStyle} onClick={onFullscreen} aria-label="Enter Fullscreen">
          <FullscreenEnterIcon />
        </button>
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
