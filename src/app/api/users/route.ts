import { NextResponse } from 'next/server';

const data = {
  age: 20,
  firstName: 'API',
  lastName: 'API/ROUTE',
};

export async function GET() {
  // if (process.env.NEXT_PUBLIC_USE_API_ROUTE === 'disabled') {
  //   console.log('sample',process.env.SAMPLE)
  //   return new Response(null, { status: 400 });
  // }

  try {
    const res = await fetch(`${process.env.ROUTE_API_URL}/users`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) throw new Error('Failed to fetch user');
    // const json = await res.json();

    // // 正常にレスポンスを返す
    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    // エラー時のレスポンス
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }

  // try {
  //   const endpoint = `${process.env.ROUTE_API_URL}/users`;
  //   const res = await fetch(endpoint, {
  //     method: 'GET',
  //     cache: 'no-store',
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //   });
  //   const data = await res.json();

  //   if (!res.ok) {
  //     throw new Error('Failed to fetch user data')
  //   };

  //   return NextResponse.json(data, {
  //     status: 200,
  //   });
  // } catch (error: unknown) {
  //   return NextResponse.json(
  //     { error: (error as Error).message },
  //     { status: 500 },
  //   );
  // }
}
