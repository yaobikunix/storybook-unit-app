/* tailwind CSSの対応するために必要 */
import '../src/app/globals.css';

import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';

// import { handlers } from '../src/mocks/handlers/userProfile';
import { handlers } from '../src/services/mocks/handlers';

/* MSW を初期化する */
initialize({ onUnhandledRequest: 'bypass' });

const preview: Preview = {
  // Add the MSW loader to all stories
  loaders: [mswLoader],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // msw: handlers,　// ここでAPIのモックを適用
    msw: [...handlers],
  },

  tags: ['autodocs'],
};

export default preview;
