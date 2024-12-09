import { TouchableOpacity } from "react-native";
import { css } from "styled-components";
import styled from "styled-components/native";

export const Container = styled(TouchableOpacity)`
  flex-direction: row;
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 12px; 

  justify-content: space-between;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 6px;

  margin-top: 8px;
  margin-bottom: 8px;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  gap: 12px;
`;

type TextProps = {
  isText?: boolean
}

export const Text = styled.Text<TextProps>`
  ${({ theme, isText }) => css`
    font-size: ${isText ? theme.FONT_SIZE.MD : theme.FONT_SIZE.SM}px;
    font-weight: ${isText ? 'normal' : 'bold'};
    color: ${theme.COLORS.GRAY_100};
  `}
`;

export const Divider = styled.View`
  width: 1px;
  height: 14px;
  
  background-color: ${({ theme }) => theme.COLORS.GRAY_400};
`;

type IsDietProps = {
  isDiet?: boolean
}

export const IsDiet = styled.View<IsDietProps>`  
  background-color: ${props => props.isDiet ? props.theme.COLORS.GREEN_LIGHT : props.theme.COLORS.RED_LIGHT};
  width: 14px;
  height: 14px;
  
  border-radius: 50%;
`;