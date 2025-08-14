'use client';

import useSWR from 'swr';
// import { fetchUser } from '@/services/user/action';

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
  data: User[] | undefined;
}

export async function fetchUser(): Promise<Response> {
  try {
    console.log('Fetching user data...');
    const res = await fetch('http://localhost:3000/api/users', {
      cache: 'no-store',
      headers: {
        pragma: 'no-cache',
        cacheControl: 'no-cache',
      },
    });

    console.log('Fetch response:', res);
    const data = await res.json();
    console.log('Parsed data:', data);

    if (!res.ok) {
      throw new Error('Failed to fetch users data');
    }

    return data;
  } catch (error: unknown) {
    console.error('Fetch error details:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}

export const useUser = () => {
  const {
    data: res,
    error,
    mutate,
  } = useSWR<Response>('api-users-key', () => fetchUser(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 0,
    // エラー発生時のリトライを無効化
    shouldRetryOnError: false,
    // 初期データを提供
    fallbackData: {
      status: 0,
      meta: { page: 0, perPage: 0, totalCount: 0 },
      data: [],
    },
  });

  // console.log('users:', res);
  // console.log('error:', error);
  // console.log('mutate:', mutate);
  return {
    users: res?.data,
    error: error,
    mutate: mutate,
  };
};

export default function User() {
  const { users, error, mutate } = useUser();

  if (!users && !error) return <p>Loading...</p>;
  if (error) return <p>Failed to load users</p>;
  if (!users) return <p>No users data</p>;

  return (
    <section>
      <h2 className="mb-2 text-[20px] font-bold">User Profile</h2>

      {users.map((user: User, key: number) => (
        <div className="mb-2" key={key}>
          <p>age: {user.age}</p>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
        </div>
      ))}

      <button
        className="px-4 py-2 rounded-md text-[#fff] bg-[#1677ff]"
        type="button"
        onClick={() => mutate()}
      >
        Reload Button
      </button>
    </section>
  );
}
