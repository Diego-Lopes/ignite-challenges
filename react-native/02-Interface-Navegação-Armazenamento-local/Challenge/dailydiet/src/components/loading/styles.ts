import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: 55px;
  height: 55px;

`;

export const Text = styled.Text`
 ${({ theme }) => css`
  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
  /* line-height: ${theme.LINE_HEIGHT[130]}px; */
  color: ${theme.COLORS.GRAY_200};
 `}

 margin-top: 8px;
`;