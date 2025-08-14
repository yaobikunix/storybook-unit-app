import User from '@/components/User';
import { response, userHandler } from '@/services/user/handler';

import type { Meta, StoryObj } from '@storybook/react';

// import { http, HttpResponse, delay } from 'msw';
// const TestData = {
//   user: {
//     userID: 1,
//     name: 'Someone',
//   },
//   document: {
//     id: 1,
//     userID: 1,
//     title: 'Something',
//     brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     status: 'approved',
//   }
// }

const meta = {
  title: 'components/User',
  component: User,
  parameters: {
    layout: 'centered',
    // ここでは、Storyレベルでハンドラを設定しています。
    // msw: userHandler[0],
  },
} satisfies Meta<typeof User>;
export default meta;

type Story = StoryObj<typeof meta>;

// export const MockedSuccess: Story = {
//   parameters: {
//     msw: {
//       handlers: [
//         http.get('/api/user', () => {
//           return HttpResponse.json(data);
//         }),
//       ],
//     },
//   },
// };

export const MockAPI: Story = {
  args: {
    handler: userHandler,
    response: response,
  },
};

export const Default: Story = {
  args: {
    user: {
      firstName: 'Neilxxxxxxx',
      lastName: 'Maverick',
    },
  },
};

export const LongNames: Story = {
  args: {
    user: {
      firstName: 'Christopher Alexander',
      lastName: 'Montgomery-Richardson',
    },
  },
};
