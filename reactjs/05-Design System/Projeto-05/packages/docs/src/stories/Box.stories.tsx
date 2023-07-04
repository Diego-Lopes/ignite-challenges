import { Box, BoxProps, Text } from '@ignite-ui-diego/react'
import type { StoryObj, Meta } from '@storybook/react' // typagem do typescript

export default {
  // essa é a configuração global
  title: 'Surfaces/Box',
  component: Box,

  // args são propriedades
  args: {
    children: <Text>Testeando o elemento Box</Text>,
  },
} as Meta<BoxProps>

export const Primary: StoryObj<BoxProps> = {}
