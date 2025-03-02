import User from '@/components/User';
import { userHandler } from '@/services/user/handler';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/User',
  component: User,
  parameters: {
    layout: 'centered',
    // ここでは、Storyレベルでハンドラを設定しています。
    msw: userHandler[0],
  },
} satisfies Meta<typeof User>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Mock: Story = {
  args: {
    msw: userHandler[0],
  },
};

export const Default: Story = {
  args: {
    user: {
      firstName: 'Neil',
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
