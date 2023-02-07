import styled from "styled-components";

export const ListCoffeeContainer = styled.div`
  width: 100%;
`;

export const Content = styled.div`
  width: min(112rem, 100%);
  margin-inline: auto;

  h1 {
    font-size: 3.2rem;
    font-family: "Baloo 2";
    line-height: 130%;
    color: ${props => props.theme["base-subtitle"]}
  }
`;

export const Wrapper = styled.div`
  width: min(112rem, 100%);

  display: flex;
  flex-wrap: wrap; 
  justify-items: flex-start;
  gap: 4rem 3.2rem;
`;
