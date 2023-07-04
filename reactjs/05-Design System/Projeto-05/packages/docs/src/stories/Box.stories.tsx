import { Box, BoxProps } from '@ignite-ui-diego/react'
import type { StoryObj, Meta } from '@storybook/react' // typagem do typescript

export default {
  // essa é a configuração global
  title: 'Surfaces/Box',
  component: Box,

  // args são propriedades
  args: {
    children: (
      <>
        <span>Testeando o elemento Box</span>
      </>
    ),
  },
} as Meta<BoxProps>

export const Primary: StoryObj<BoxProps> = {}
