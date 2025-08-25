// クライアントコンポーネント内だと、明示的に「'use server'」としないとエラーになる
'use server';

import type { UserResponse } from '@/types/user';

export async function fetchUserAction(): Promise<UserResponse> {
  // http://localhost:3000
  const endpoint = `${process.env.LOCAL_API_URL}/users`;

  try {
    console.log('Fetching user data... LOCAL_API_URL:', endpoint);
    const res = await fetch(endpoint, {
      cache: 'no-store',
      headers: {
        pragma: 'no-cache',
        cacheControl: 'no-cache',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch users data');
    }

    const data = await res.json();
    return data;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';

    if (err instanceof Error) {
      console.error('Error stack:', err.stack);
    }

    throw new Error(message);
  }
}
