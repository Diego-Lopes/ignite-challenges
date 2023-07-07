import { Text, TextProps } from '@ignite-ui-diego/react'
import type { StoryObj, Meta } from '@storybook/react' // typagem do typescript

export default {
  // essa é a configuração global
  title: 'Typography/Text',
  component: Text,

  // args são propriedades
  args: {
    size: 'md',
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid molestiae odio repellendus facilis, asperiores magni delectus sunt, expedita fugiat corrupti non harum! Possimus facilis dignissimos esse inventore numquam soluta ab.',
  },
  argTypes: {
    size: {
      options: [
        'xxs',
        'xs',
        'sm',
        'md',
        'lg',
        '2xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
        '8xl',
        '9xl',
      ],
      control: {
        type: 'inline-radio',
      },
    },
  },
  parameters: {
    docs: {
      canvas: { SourceState: 'show' },
    },
  },
} as Meta<TextProps>

export const Primary: StoryObj<TextProps> = {}
export const CustomTag: StoryObj<TextProps> = {
  args: {
    children: 'Strong text',
    as: 'strong',
  },
}
