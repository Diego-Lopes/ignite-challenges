import styled, { css } from 'styled-components'

export type VariantType = 'primary' | 'secondary' | 'danger' | 'success'

interface IButtonContainerProps {
  variant: VariantType
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
}

export const ButtonContainer = styled.button<IButtonContainerProps>`
  width: 100px;
  height: 80px;
  margin: 8px;
  transition: background-color 550ms linear;
  color: ${(props) => props.theme.white};

  /* interpolação de string */
  ${(props) => {
    return css`
      background: ${buttonVariants[props.variant]};
    `
  }}
`
