'use client';

import useSWR from 'swr';
import { fetchUser } from '@/services/user/action';

export default function User() {
  const {
    data: user,
    error,
    mutate,
  } = useSWR('/api/user', fetchUser, {
    // キャッシュの設定を調整
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 0,
  });

  if (error && !user) return <p>Loading...</p>;
  if (error) return <p>Failed to load user</p>;
  if (!user) return <p>No user data</p>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <button type="button" onClick={() => mutate()}>
        Reload
      </button>
    </div>
  );
}
