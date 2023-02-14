import styled from "styled-components";

interface ButtonCheckoutProps {
  howManyInTheCart?: number;
}

export const HeaderContainer = styled.div`
  width: 100%;
  height: 104px;
  transition: 350ms ease-in-out;
  transform-origin: 50% 50%;

  background-color: ${(props) => props.theme.background};
  padding: 32px 106px;

  @media screen and (min-width: 1440px) {
    padding: 32px 0;
  }
`;

export const Wrapper = styled.header`
  width: min(112rem, 100%);

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-inline: auto;

  img {
    width: 120px;
    height: fit-content;
  }

  &.fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 104px;
    transition: 350ms ease-in-out;
    transform-origin: center;
    background-color: ${(props) => props.theme.background};
    padding: 32px 106px;
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
  background: ${(props) => props.theme["purple-light"]};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 1.4rem;
  color: ${(props) => props.theme["purple-dark"]};

  svg {
    fill: ${(props) => props.theme.purple};
  }
`;

export const ButtonCheckout = styled(ButtonBase)<ButtonCheckoutProps>`
  background: ${(props) => props.theme["yellow-light"]};
  position: relative;

  svg {
    fill: ${(props) => props.theme["yellow-dark"]};
  }

  &:before {
    content: "${(props) => props.howManyInTheCart}";
    width: 20px;
    height: 20px;
    padding: 0.35rem 0.35rem;
    position: absolute;

    top: -0.8rem;
    right: -1.635rem;
    z-index: 100;

    border-radius: 1000px;
    background: ${(props) =>
      props.howManyInTheCart ? props.theme["yellow-dark"] : "transparent"};

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${(props) => props.theme.white};
    font-size: 1.2rem;
    font-weight: 700;
  }
`;
