import { http, HttpResponse } from 'msw';
import { mockUserResponse } from './response';

// 'http://localhost:3000/api',
const endpoint = `${process.env.LOCAL_API_URL}/users`;

const handler = /* async */ () => {
  // await delay('real');
  return HttpResponse.json(mockUserResponse);
};

export const userHandler = [http.get(endpoint, handler)];
