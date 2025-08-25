import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@chromatic-com/storybook', // Chromaticの連携（UIテストやレビュー用）を有効化
    '@storybook/addon-essentials', // controls, actions, docs などの基本機能セット
    '@storybook/addon-interactions', // ユーザー操作シミュレーションやテスト用
    '@storybook/addon-onboarding', // Storybook の導入チュートリアル（ガイド）
    // '@storybook/addon-mdx-gfm',   // MDXを使わないなら不要
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
