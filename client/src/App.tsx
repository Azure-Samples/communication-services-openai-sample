// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import './App.css';
import { DEFAULT_COMPONENT_ICONS, FluentThemeProvider } from '@azure/communication-react';
import { initializeIcons, registerIcons } from '@fluentui/react';
import { Stack } from '@fluentui/react';
import { OpenAiView } from './views/OpenAiView';

initializeIcons();
registerIcons({ icons: DEFAULT_COMPONENT_ICONS });

function App(): JSX.Element {
  return (
    <FluentThemeProvider>
      <Stack horizontal>
        <OpenAiView />
      </Stack>
    </FluentThemeProvider>
  );
}

export default App;
