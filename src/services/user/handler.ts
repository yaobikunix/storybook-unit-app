import { http, HttpResponse } from 'msw';

export const userHandler = [
  http.get('/api/user', () => {
    return HttpResponse.json(
      { firstName: 'MOCKS', lastName: 'HANDLER' },
      { status: 200 },
    );
  }),
];
