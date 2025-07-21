// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { IButtonStyles } from '@fluentui/react';
import { CSSProperties } from 'react';

// Color constants
const colors = {
  primary: '#0078D4',
  white: '#FFFFFF',
  darkGray: '#333333',
  mediumGray: '#555',
  lightGray: '#666666',
  borderGray: '#E0E0E0',
  disabledGray: '#cccccc',
  iconGray: '#777',
  backgroundLight: '#F0F0F0',
  buttonBorder: '#DADADA',
  textDark: 'rgb(59, 58, 57)'
} as const;

export const pulseAnimation = `
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 120, 212, 0.7);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 0.625rem rgba(0, 120, 212, 0);
    }
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 120, 212, 0);
    }
  }
`;

export const baseWidgetStyle: CSSProperties = {
  fontFamily: 'Arial, sans-serif',
  borderRadius: '0.75rem', // 12px
  boxShadow: '0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)', // 0 4px 12px
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'fixed',
  zIndex: 1000,
  justifyContent: 'center',
  backgroundColor: colors.backgroundLight,
  width: '18.75rem', // 300px
  height: 'auto',
  padding: '1.5rem', // 24px
  paddingBottom: '1.25rem', // 20px
  bottom: '1.25rem', // 20px
  right: '1.25rem' // 20px
};

export const expertCardStyle: CSSProperties = {
  ...baseWidgetStyle
};

export const agentSpeakingViewBaseStyle: CSSProperties = {
  ...baseWidgetStyle
};

export const agentSpeakingCardStyle: CSSProperties = {
  ...agentSpeakingViewBaseStyle
};

export const fullscreenViewStyle: CSSProperties = {
  ...agentSpeakingViewBaseStyle,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  borderRadius: '0',
  padding: '1.25rem', // 20px
  justifyContent: 'space-between',
  zIndex: 2000
};

export const pulsatingLogoWrapperBaseStyle: CSSProperties = {
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.white
};

export const cardPulsatingLogoWrapperStyle: CSSProperties = {
  ...pulsatingLogoWrapperBaseStyle,
  width: '5rem', // 80px
  height: '5rem', // 80px
  marginBottom: '0.625rem', // 10px
  borderRadius: '50%',
  background: colors.white
};

export const fullscreenPulsatingLogoWrapperStyle: CSSProperties = {
  ...pulsatingLogoWrapperBaseStyle,
  width: '7.5rem', // 120px
  height: '7.5rem' // 120px
};

export const titleStyle: CSSProperties = {
  fontSize: '1.125rem', // 18px
  fontWeight: 'bold',
  color: colors.darkGray,
  margin: '0 0 0.5rem 0' // 0 0 8px 0
};

export const subtitleStyle: CSSProperties = {
  fontSize: '0.875rem', // 14px
  color: colors.lightGray,
  margin: '0 0 1.25rem 0', // 0 0 20px 0
  lineHeight: '1.4'
};

export const getAdviceButtonStyle: CSSProperties = {
  backgroundColor: colors.primary,
  color: colors.white,
  border: 'none',
  borderRadius: '0.375rem', // 6px
  padding: '0.625rem 1.25rem', // 10px 20px
  fontSize: '1rem', // 16px
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%'
};

export const collapsedButtonStyle: CSSProperties = {
  position: 'fixed',
  bottom: '1.25rem', // 20px
  right: '1.25rem', // 20px
  backgroundColor: colors.white,
  color: colors.primary,
  border: `1px solid ${colors.borderGray}`,
  borderRadius: '1.5625rem', // 25px
  padding: '0.625rem 1.25rem', // 10px 20px
  fontSize: '0.875rem', // 14px
  fontWeight: '600',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 0.125rem 0.5rem rgba(0, 0, 0, 0.15)', // 0 2px 8px
  zIndex: 1000
};

export const agentSpeakingTextBaseStyle: CSSProperties = {
  color: '#333',
  margin: '0.125rem 0' // 2px 0
};

export const cardAgentSpeakingTextStyleContoso: CSSProperties = {
  ...agentSpeakingTextBaseStyle,
  fontSize: '0.8125rem', // 13px
  color: colors.mediumGray
};

export const cardAgentSpeakingTextStyleStatus: CSSProperties = {
  ...agentSpeakingTextBaseStyle,
  fontSize: '1.125rem', // 18px
  fontWeight: 'bold'
};

export const fullscreenAgentSpeakingTextStyleContoso: CSSProperties = {
  ...agentSpeakingTextBaseStyle,
  fontSize: '1rem', // 16px
  color: colors.mediumGray,
  marginTop: '0.9375rem' // 15px
};

export const fullscreenAgentSpeakingTextStyleStatus: CSSProperties = {
  ...agentSpeakingTextBaseStyle,
  fontSize: '1.5rem', // 24px
  fontWeight: 'bold'
};

export const iconButtonContainerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  width: '100%',
  marginTop: '1.5625rem' // 25px
};

export const fullscreenIconButtonContainerStyle: CSSProperties = {
  ...iconButtonContainerStyle,
  marginTop: 'auto',
  paddingBottom: '2.5rem' // 40px
};

export const fullscreenButtonStyle: CSSProperties = {
  position: 'absolute',
  top: '0.625rem', // 10px - changed from 0.9375rem (15px) to match closeButtonStyle
  right: '0.625rem', // 10px - changed from 0.9375rem (15px) to match closeButtonStyle
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: colors.mediumGray,
  padding: '0.3125rem' // 5px
};

export const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '0.625rem', // 10px
  right: '0.625rem', // 10px
  background: 'none',
  border: 'none',
  fontSize: '1.5rem', // 24px
  cursor: 'pointer',
  color: colors.iconGray,
  padding: '0',
  lineHeight: '1'
};

export const getAdviceButtonDisabledStyle: React.CSSProperties = {
  opacity: 0.5,
  cursor: 'not-allowed',
  backgroundColor: colors.disabledGray,
  color: colors.lightGray
};

export const getAdviceButtonLoadingStyle: React.CSSProperties = {
  opacity: 0.5,
  cursor: 'not-allowed'
};

export const iconButtonStyles: IButtonStyles = {
  root: {
    background: colors.white,
    border: `1px solid ${colors.buttonBorder}`,
    borderRadius: '50%',
    width: '2.75rem', // 44px
    margin: '0 0.625rem', // 0 10px
    color: colors.textDark,
    i: {
      color: colors.textDark
    }
  }
};
