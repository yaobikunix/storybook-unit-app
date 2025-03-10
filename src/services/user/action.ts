// 'use server';

interface User {
  age: number;
  firstName: string;
  lastName: string;
}

interface Meta {
  page: number;
  perPage: number;
  totalCount: number;
}

interface Response {
  status: number;
  meta: Meta;
  data: User[];
}

/**
 * fetchUser
 */
export async function fetchUser(): Promise<Response> {
  // API のベース URL を環境変数から取得
  //   const API_BASE_URL =
  //     process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
  //       ? '' // MSW 用
  //       : process.env.NEXT_PUBLIC_API_PRODUCTION;
  // console.log('URL',API_BASE_URL);

  try {
    // const res = await fetch(`${API_BASE_URL}/api/user`, {
    const res = await fetch('/api/user', {
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

    return await res.json();
  } catch (error: unknown) {
    console.error('Fetch error:', error);
    throw error;
  }
}
