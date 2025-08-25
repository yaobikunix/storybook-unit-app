'use client';

import useSWR from 'swr';
import { fetchUserAction } from '@/mocks/user/action';
import type { User, UserResponse } from '@/types/user';

export const useUser = () => {
  const {
    data: res,
    error,
    mutate,
  } = useSWR<UserResponse>('api-users-key', () => fetchUserAction(), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 0,
    // エラー発生時のリトライを無効化
    shouldRetryOnError: false,
    // 初期データを提供
    // fallbackData: {
    //   status: 0,
    //   meta: { page: 0, perPage: 0, totalCount: 0 },
    //   data: [],
    // },
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
          <p>age: {user.id}</p>
          <p>First Name: {user.name}</p>
          <p>Last Name: {user.username}</p>
          <p>email: {user.email}</p>
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
