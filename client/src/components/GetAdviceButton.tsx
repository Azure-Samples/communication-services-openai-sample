// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PhoneIcon } from './constants';
import * as styles from '../styles/OpenAiWidget.styles';

interface GetAdviceButtonProps {
  setIsOpenCallback: (isOpen: boolean) => void;
}

export const GetAdviceButton = (props: GetAdviceButtonProps): JSX.Element => {
  return (
    <button style={styles.collapsedButtonStyle} onClick={() => props.setIsOpenCallback(true)}>
      <PhoneIcon />
      Talk with an expert
    </button>
  );
};
