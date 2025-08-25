'use client';

import useSWR from 'swr';

const initializeMSW = async () => {
  try {
    // モックAPIが有効になっている場合にのみ`MSW`を実行する
    if (process.env.NEXT_PUBLIC_MOCK_API === 'enabled') {
      const { startMSW } = await import('@/services/mocks');
      await startMSW();
      return true;
    }

    // ここを true にしておくことでモックの無効化を確定する
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
  if (isMockReady === false) {
    console.warn('MSW initialization failed');
    return <p>Failed to start mock server</p>;
  }

  // `MSW`（モックサーバー）の初期化実行中の状態
  if (isMockReady === undefined) {
    return <p>Loading mock server...</p>;
  }

  return <>{children}</>;
}
