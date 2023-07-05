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
} as Meta<AvatarProps>

export const Primary: StoryObj<AvatarProps> = {}
export const WithFallback: StoryObj<AvatarProps> = {
  args: {
    src: undefined,
  },
}
