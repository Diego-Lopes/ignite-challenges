import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 24px;

  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Content = styled.View`
  gap: 40px;
  justify-content: center;
  align-items: center;
`;