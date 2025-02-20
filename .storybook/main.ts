import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@chromatic-com/storybook', // Chromaticを使わないなら不要
    '@storybook/addon-essentials',
    '@storybook/addon-interactions', // UIテストをしないなら不要
    '@storybook/addon-onboarding', // Storybookの導入ガイド用。不要ならコメントアウト
    '@storybook/addon-mdx-gfm', // MDXを使わないなら不要
  ],

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  staticDirs: ['../public'],

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
export default config;
