'use client';

import useSWR from 'swr';

const initializeMSW = async () => {
  try {
    // ★ Next.js Configで事前判定済み - 条件分岐不要！★
    // MSWが不要と判定された場合、import自体が空のモジュールを返す
    const { startMSW } = await import('@/mocks/initialize');
    await startMSW();

    console.log('[MSW] Initialized (pre-judged)');
    return true;
  } catch (error) {
    console.error('MSW initialization error:', error);
    return false;
  }
};

export function MockingProvider({ children }: { children: React.ReactNode }) {
  // `MSW`（モックサーバー）の初期化を実行する
  const { data: isMockReady } = useSWR('msw-init-key', initializeMSW, {
    suspense: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // `MSW`（モックサーバー）の初期化に失敗した際の処理
  if (isMockReady === false) return <p>Failed to start mock server</p>;

  // `MSW`（モックサーバー）の初期化実行中の状態
  if (isMockReady === undefined) return <p>Loading...</p>;

  return <>{children}</>;
}

// try {
//   // Storybook でのみ MSW を起動
//   const isBrowser = typeof window !== 'undefined';
//   const isStorybook = isBrowser && window.location.origin.includes('6006');

//   // モックAPIが有効になっている場合にのみ`MSW`を実行する
//   if (
//     isStorybook &&
//     process.env.NEXT_PUBLIC_MOCK_API === 'enabled'
//   ) {
//     const { startMSW } = await import('@/mocks/init');
//     await startMSW();
//     return true;
//   }

//   // ここを true にしておくことでモックの無効化を確定する
//   return true;
// } catch (error) {
//   console.error('MSW initialization error:', error);
//   return false;
// }
