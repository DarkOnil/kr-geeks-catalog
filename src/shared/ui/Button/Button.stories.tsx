import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Кнопка',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Кнопка',
    variant: 'secondary',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Кнопка',
    variant: 'ghost',
  },
}
