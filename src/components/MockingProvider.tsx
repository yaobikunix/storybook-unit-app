'use client';

import useSWR from 'swr';

const MSW_INIT_KEY = 'msw-init';

const initializeMSW = async () => {
  try {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      const { startMSW } = await import('@/services/mocks');
      await startMSW();
      return true;
    }
    return true;
  } catch (error) {
    console.error('MSW initialization error:', error);
    return false;
  }
};

export function MockingProvider({ children }: { children: React.ReactNode }) {
  const { data: isMockReady } = useSWR(MSW_INIT_KEY, initializeMSW, {
    suspense: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // エラー処理を追加
  if (isMockReady === false) {
    console.warn('MSW initialization failed');
  }

  if (isMockReady === undefined) {
    return null;
  }

  return <>{children}</>;
}
