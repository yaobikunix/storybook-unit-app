import { NextResponse } from 'next/server';

export async function GET() {
  // 'https://jsonplaceholder.typicode.com/
  const endpoint = `${process.env.EXTERNAL_API_URL}/users`;

  try {
    console.log('Fetching user data... EXTERNAL_API_URL:', endpoint);
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user');
    }

    // 正常にレスポンスを返す
    const data = await res.json();
    return NextResponse.json({
      status: 200,
      data: data,
      meta: { page: 1, perPage: 10, totalCount: 10 },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';

    if (err instanceof Error) {
      console.error('Error stack:', err.stack);
    }

    // エラーレスポンスを返す
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
