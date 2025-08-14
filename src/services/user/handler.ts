import { http, HttpResponse } from 'msw';

// headers: { 'Access-Control-Allow-Origin': '*' },
export const response = {
  status: 200,
  meta: {
    page: 1, // 現在のページ
    perPage: 10, // 1ページあたりのアイテム数
    totalCount: 10, // ユーザーの総数
  },
  data: [{ age: 30, firstName: 'MOCK', lastName: 'HANDLER' }],
};

export const userHandler = [
  http.get(
    'http://localhost:3000/api/users',
    /* async */ () => {
      // await delay('real');
      return HttpResponse.json(response);
    },
  ),
];
