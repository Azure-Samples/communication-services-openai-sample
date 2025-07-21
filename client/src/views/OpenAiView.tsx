// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { useState } from 'react';
import { GetAdviceButton } from '../components/GetAdviceButton';
import { OpenAiWidget } from '../components/OpenAiWidget';

export const OpenAiView = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && <GetAdviceButton setIsOpenCallback={setIsOpen} />}
      {isOpen && <OpenAiWidget setIsOpenCallback={setIsOpen} />}
    </>
  );
};
