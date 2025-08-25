// 'use server';

// interface User {
//   age: number;
//   firstName: string;
//   lastName: string;
// }

// interface Meta {
//   page: number;
//   perPage: number;
//   totalCount: number;
// }

// interface Response {
//   status: number;
//   meta: Meta;
//   data: User[];
// }

/**
 * fetchUser
 */
// fetchUser 関数内のエラーハンドリングを強化
// export async function fetchUser(): Promise<Response> {
//   try {
//     console.log('Fetching user data...');
//     const res = await fetch('http://localhost:3000/api/users', {
//       cache: 'no-store',
//       headers: {
//         pragma: 'no-cache',
//         cacheControl: 'no-cache',
//       },
//     });

//     console.log('Fetch response:', res);
//     const data = await res.json();
//     console.log('Parsed data:', data);

//     if (!res.ok) {
//       throw new Error('Failed to fetch users data');
//     }

//     return data;
//   } catch (error: unknown) {
//     console.error('Fetch error details:', error);
//     if (error instanceof Error) {
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
//     }
//     throw error;
//   }
// }
