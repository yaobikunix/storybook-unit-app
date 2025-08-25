import User from '@/components/User';
import type { Meta, StoryObj } from '@storybook/react';

// ここより、モック用のAPIを傍受してStoryBookにて一覧化する
import { userHandler } from '@/mocks/user/handler';
import { mockUserResponse } from '@/mocks/user/response';

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

/* ===========================
    API Mock Stories
============================= */
export const MockAPI: Story = {
  args: {
    handler: userHandler,
    mockData: mockUserResponse,
  },
};

/* ===========================
    UI State Stories
============================= */
// 初期状態
export const Default: Story = {
  args: {
    user: {
      firstName: 'Neil',
      lastName: 'Maverick',
    },
  },
};

// 名前が長い時の状態
export const LongNames: Story = {
  args: {
    user: {
      firstName: 'Christopher Alexander',
      lastName: 'Montgomery-Richardson',
    },
  },
};
