import { http, HttpResponse } from 'msw';

export const userHandler = [
  http.get('/api/user', () => {
    return HttpResponse.json(
      { firstName: 'MOCK', lastName: 'HANDLER' },
      { status: 200 },
    );
  }),
];
