import { Avatar, AvatarProps } from '@ignite-ui-diego/react'
import type { StoryObj, Meta } from '@storybook/react' // typagem do typescript

export default {
  // essa é a configuração global
  title: 'Data display/Avatar',
  component: Avatar,

  // args são propriedades
  args: {
    src: 'https://github.com/diego-lopes.png',
    alt: 'Diego Lopes',
  },
  argTypes: {
    src: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta<AvatarProps>

export const Primary: StoryObj<AvatarProps> = {}
export const WithFallback: StoryObj<AvatarProps> = {
  args: {
    src: undefined,
    alt: '',
  },
  argTypes: {
    src: {
      control: {
        type: null,
      },
    },
    alt: {
      control: {
        type: null,
      },
    },
  },
}
