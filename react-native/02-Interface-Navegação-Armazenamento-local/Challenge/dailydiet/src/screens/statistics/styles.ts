import { ButtonTypeStyleProps } from "@components/viewDietButton/styles";
import styled from "styled-components/native";

type ContainerProps = {
  type: ButtonTypeStyleProps
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  padding: 24px;

  background-color: ${({ theme, type }) => type === 'PRIMARY' ? theme.COLORS.GREEN_MID : theme.COLORS.RED_MID};
`;


export const Content = styled.View`


`;