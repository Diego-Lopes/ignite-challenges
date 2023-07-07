import { Heading, HeadingProps } from '@ignite-ui-diego/react'
import type { StoryObj, Meta } from '@storybook/react' // typagem do typescript

export default {
  // essa é a configuração global
  title: 'Typography/Heading',
  component: Heading,

  // args são propriedades
  args: {
    size: 'md',
    children: 'Custom Title',
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', '2xl', '4xl', '5xl', '6xl'],
      control: {
        type: 'inline-radio',
      },
    },
  },
} as Meta<HeadingProps>

export const Primary: StoryObj<HeadingProps> = {}
export const CustomTag: StoryObj<HeadingProps> = {
  args: {
    children: 'H1 Heading',
    as: 'h1',
  },
}
