import User from '@/components/User';
import { handlers } from '@/services/mocks/handlers';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/User',
  component: User,
  parameters: {
    layout: 'centered',
    // ここでは、Storyレベルでハンドラを設定しています。
    msw: {
      handlers: [...handlers],
    },
  },
} satisfies Meta<typeof User>;
export default meta;

type Story = StoryObj<typeof meta>;

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
