'use client';

import useSWR from 'swr';
import { fetchUser } from '@/services/user/action';

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

export const useUser = () => {
  const {
    data: res,
    error,
    mutate,
  } = useSWR<Response>('/api/user', fetchUser, {
    // キャッシュの設定を調整
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 0,
  });

  console.log('users:', res?.data);
  console.log('error:', error);
  console.log('mutate:', mutate);
  return {
    users: res?.data,
    error: error,
    mutate: mutate,
  };
};

export default function User() {
  // const {
  //   data: user,
  //   error,
  //   mutate,
  // } = useSWR('/api/user', fetchUser, {
  //   // キャッシュの設定を調整
  //   revalidateOnFocus: false,
  //   revalidateOnReconnect: false,
  //   dedupingInterval: 0,
  // });
  const { users, error, mutate } = useUser();

  if (error && !users) return <p>Loading...</p>;
  if (error) return <p>Failed to load uses</p>;
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
        className="px-4 py-2 rounded-md bg-[#37d5d3]"
        type="button"
        onClick={() => mutate()}
      >
        Reload Button
      </button>
    </section>
  );
}
