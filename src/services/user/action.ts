// 'use server';

/**
 * fetchUser
 */
export async function fetchUser() {
  // API のベース URL を環境変数から取得
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
      ? '' // MSW 用
      : process.env.NEXT_PUBLIC_API_PRODUCTION;

  try {
    const res = await fetch(`${API_BASE_URL}/api/user`, {
      // キャッシュを無効化してリアルタイムデータを取得
      cache: 'no-store',
      // 開発環境でも常に新しいリクエストを行う
      headers: {
        pragma: 'no-cache',
        cacheControl: 'no-cache',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user data');
    }
    return res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
