import Plus from "phosphor-react-native/src/icons/Plus";
import { TouchableOpacity } from "react-native";
import { css } from "styled-components";
import styled from "styled-components/native";

export const Container = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px 24px;

  border-radius: 6px;

  gap: 16px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_200};
`

export const Icon = styled(Plus).attrs(({ theme }) => ({
  size: 18,
  weight: 'bold',
  color: theme.COLORS.WHITE,
}))`
`

export const Text = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
  `}

`