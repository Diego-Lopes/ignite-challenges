import ArrowUpRight from 'phosphor-react-native/src/icons/ArrowUpRight';
import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY'

type TouchableOpacityProps = {
  type: ButtonTypeStyleProps
}


export const Container = styled(TouchableOpacity) <TouchableOpacityProps>`
   width: 100%;
  height: 102px;

  padding: 16px 20px;

  border-radius: 8px;

  position: relative;

  ${({ theme, type }) => css`
    background-color: ${type === 'PRIMARY' ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT};
  `}
`;

export const Content = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE["2XL"]}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.GRAY_100};
  `}
`;

export const Description = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XS}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_200};
  `}  

`;

export const IconArrowURight = styled(ArrowUpRight).attrs<TouchableOpacityProps>(({ theme, type }) => ({
  size: 24,
  color: type === 'PRIMARY' ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK
}))`
  position: absolute;
  right: 10px;
  top: 12px;
`;
