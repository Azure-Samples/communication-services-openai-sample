// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { useCallback } from 'react';
import { DevicesButton, EndCallButton, MicrophoneButton, usePropsFor } from '@azure/communication-react';
import * as styles from '../styles/OpenAiWidget.styles';
import { Stack } from '@fluentui/react';

export const OpenAiControlBar = ({ onHangup }: { onHangup: () => void }): JSX.Element => {
  const endCallProps = usePropsFor(EndCallButton);
  const microphoneProps = usePropsFor(MicrophoneButton);
  const deviceSettingsProps = usePropsFor(DevicesButton);

  const onClose = useCallback(async (): Promise<void> => {
    await endCallProps.onHangUp();
    onHangup;
  }, [endCallProps]);

  return (
    <Stack style={styles.iconButtonContainerStyle}>
      {endCallProps && <EndCallButton styles={styles.iconButtonStyles} {...endCallProps} onHangUp={onClose} />}
      {microphoneProps && <MicrophoneButton styles={styles.iconButtonStyles} {...microphoneProps} />}
      {deviceSettingsProps && (
        <DevicesButton
          styles={styles.iconButtonStyles}
          {...deviceSettingsProps}
          cameras={[]}
          selectedCamera={undefined}
        />
      )}
    </Stack>
  );
};
