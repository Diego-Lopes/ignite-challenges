import { Button, ButtonProps } from '@ignite-ui-diego/react'
import { ArrowRight } from '@phosphor-icons/react'
import type { StoryObj, Meta } from '@storybook/react' // typagem do typescript

export default {
  // essa é a configuração global
  title: 'Form/Button',
  component: Button,

  // args são propriedades
  args: {
    children: 'Send',
  },
} as Meta<ButtonProps>

export const Primary: StoryObj<ButtonProps> = {}
export const Secondary: StoryObj<ButtonProps> = {
  args: {
    variant: 'secondary',
    children: 'Create new',
  },
}
export const Tertiary: StoryObj<ButtonProps> = {
  args: {
    variant: 'tertiary',
    children: 'Cancel',
  },
}
export const Small: StoryObj<ButtonProps> = {
  args: {
    size: 'sm',
  },
}
export const Disabled: StoryObj<ButtonProps> = {
  args: {
    disabled: true,
  },
}
export const WithIcon: StoryObj<ButtonProps> = {
  args: {
    children: (
      <>
        Próximo passo
        <ArrowRight weight="bold" />
      </>
    ),
  },
}
