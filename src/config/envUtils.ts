// 環境判定ユーティリティ
type EnvironmentsTypes = 'storybook' | 'development' | 'test' | 'production';

export const isServer = () => typeof window === 'undefined';
export const isBrowser = () => typeof window !== 'undefined';

export const isDevelopment = () => process.env.NODE_ENV === 'development';
export const isTest = () => process.env.NODE_ENV === 'test';

export const isMockEnabled = () =>
  process.env.NEXT_PUBLIC_MOCK_API === 'enabled';

export const isStorybook = () => {
  if (!isBrowser()) return false;

  // 環境変数が設定されていない場合はデフォルトポートをチェック
  const storybookPort = process.env.NEXT_PUBLIC_STORYBOOK_PORT || '6006';
  console.log('Checking Storybook port:', storybookPort);
  console.log('Current origin:', window.location.origin);

  return window.location.origin.includes(storybookPort);
};

export const getCurrentEnvironment = (): EnvironmentsTypes => {
  if (isStorybook()) return 'storybook';
  if (isDevelopment()) return 'development';
  if (isTest()) return 'test';
  return 'production';
};
