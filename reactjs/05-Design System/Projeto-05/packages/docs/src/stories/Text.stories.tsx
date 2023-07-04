import { Text, TextProps } from '@ignite-ui-diego/react'
import type { StoryObj, Meta } from '@storybook/react' // typagem do typescript

export default {
  // essa é a configuração global
  title: 'Typography/Text',
  component: Text,

  // args são propriedades
  args: {
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid molestiae odio repellendus facilis, asperiores magni delectus sunt, expedita fugiat corrupti non harum! Possimus facilis dignissimos esse inventore numquam soluta ab.',
  },
} as Meta<TextProps>

export const Primary: StoryObj<TextProps> = {}
export const CustomTag: StoryObj<TextProps> = {
  args: {
    children: 'Strong text',
    as: 'strong',
  },
}
