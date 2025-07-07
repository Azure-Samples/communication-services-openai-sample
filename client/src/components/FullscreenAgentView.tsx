// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  fullscreenViewStyle,
  fullscreenPulsatingLogoWrapperStyle,
  fullscreenAgentSpeakingTextStyleContoso,
  fullscreenAgentSpeakingTextStyleStatus,
  fullscreenButtonStyle
} from '../styles/OpenAiWidget.styles';
import { FullscreenExitIcon, LogoIcon } from './constants';
import { OpenAiControlBar } from './OpenAiControlBar';

interface FullscreenAgentViewProps {
  onClose: () => void;
  onExitFullscreen: () => void;
}

export const FullscreenAgentView = ({ onClose, onExitFullscreen }: FullscreenAgentViewProps): JSX.Element => {
  const currentPulsatingLogoWrapperStyle = { ...fullscreenPulsatingLogoWrapperStyle, animation: 'pulse 2s infinite' };

  return (
    <div style={fullscreenViewStyle}>
      <button style={fullscreenButtonStyle} onClick={onExitFullscreen} aria-label="Exit Fullscreen">
        <FullscreenExitIcon />
      </button>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1,
          justifyContent: 'center'
        }}
      >
        <div style={currentPulsatingLogoWrapperStyle}>
          <LogoIcon size={80} />
        </div>
        <p style={fullscreenAgentSpeakingTextStyleContoso}>Contoso</p>
        <p style={fullscreenAgentSpeakingTextStyleStatus}>Connected</p>
      </div>
      <OpenAiControlBar onHangup={onClose} />
    </div>
  );
};
