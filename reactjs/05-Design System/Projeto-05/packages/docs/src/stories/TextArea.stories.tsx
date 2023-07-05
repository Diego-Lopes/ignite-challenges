import { Box, Text, TextArea, TextAreaProps } from '@ignite-ui-diego/react'
import type { StoryObj, Meta } from '@storybook/react' // typagem do typescript

export default {
  // essa é a configuração global
  title: 'Form/Text Area',
  component: TextArea,

  // args são propriedades
  args: {},
  // recebe funções que retornar html
  decorators: [
    (Story) => {
      return (
        <Box
          as="label"
          css={{ display: 'flex', flexDirection: 'column', gap: '$2' }}
        >
          <Text size="sm">Observations</Text>
          {Story()}
        </Box>
      )
    },
  ],
} as Meta<TextAreaProps>

export const Primary: StoryObj<TextAreaProps> = {
  args: {
    placeholder: 'Add any observation',
  },
}

export const Disable: StoryObj<TextAreaProps> = {
  args: {
    disabled: true,
  },
}
