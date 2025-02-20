import { NextResponse } from 'next/server';

export async function GET() {
  if (process.env.NEXT_PUBLIC_USE_API_ROUTE === 'false') {
    return new Response(null, { status: 404 });
  }

  try {
    // const url = '/api/user';
    // const res = await fetch(url, {
    //     method: 'GET',
    //     headers: {
    //         Accept: 'application/json',
    //     },
    // });

    // if (!res.ok) throw new Error('Failed to fetch user');
    // const json = await res.json();

    const userData = {
      firstName: 'API',
      lastName: 'API/ROUTE',
    };

    // 正常にレスポンスを返す
    return NextResponse.json(userData, {
      status: 200,
    });
  } catch (error) {
    // エラー時のレスポンス
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
