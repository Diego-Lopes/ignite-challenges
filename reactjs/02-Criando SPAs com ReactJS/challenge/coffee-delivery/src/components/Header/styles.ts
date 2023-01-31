import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 104px;
  
  background-color: ${props => props.theme.background};
  padding: 32px 106px;
  
  @media screen and (min-width: 1440px) {
    padding: 32px 0;

  }
  
`;

export const Wrapper = styled.div`
  width: min(112rem, 100%);

 
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-inline: auto;

  img {
    width: 120px;
    height: fit-content;
  }
`;

export const BoxButons = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const ButtonBase = styled.button`
  border: none;
  padding: 8px;
  border-radius: 8px;

`;

export const ButtonLocal = styled(ButtonBase)`
  background: ${props => props.theme["purple-light"]};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 1.4rem;
  color: ${props => props.theme["purple-dark"]};

  svg {
    fill: ${props => props.theme.purple};
  }
`;

export const ButtonCheckout = styled(ButtonBase)`
  background: ${props => props.theme["yellow-light"]};

  svg {
    fill: ${props => props.theme["yellow-dark"]};
  }
`; 