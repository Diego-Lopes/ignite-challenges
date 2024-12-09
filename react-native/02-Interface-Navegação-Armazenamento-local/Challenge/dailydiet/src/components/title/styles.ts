import styled, { css } from "styled-components/native";

export const Container = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.LG}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.GRAY_100};
    background-color: ${theme.COLORS.WHITE};
  `}

`