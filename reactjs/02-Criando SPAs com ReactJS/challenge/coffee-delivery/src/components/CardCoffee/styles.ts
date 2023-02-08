import styled from "styled-components";

export const CardCoffeeContainer = styled.div`
  width: 25.6rem;
  height: 31rem;
  background-color: ${(props) => props.theme["base-card"]};

  border-radius: 6px 36px;

  display: flex;
  align-items: center;
  /* justify-content: flex-start; */
  flex-direction: column;
`;

export const BoxImageCoffee = styled.div`
  width: 120px;
  height: 100px;
  position: relative;
`;

export const ImageCoffee = styled.img`
  width: 120px;
  height: 120px;
  position: absolute;
  top: -20px;
`;

export const BoxFlags = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 4px;

  margin-block: 12px 16px;
`;

export const Flag = styled.p`
  font-size: 1rem;
  font-weight: 800;
  line-height: 130%;
  color: ${(props) => props.theme["yellow-dark"]};
  text-transform: uppercase;
  padding: 4px 8px;
  background-color: ${(props) => props.theme["yellow-light"]};
  border-radius: 100px;
  text-transform: uppercase;
`;

export const BoxDescription = styled.div`
  text-align: center;

  .title {
    margin-bottom: 8px;
    text-transform: capitalize;
    font-family: "Baloo 2", sans-serif;
    font-weight: 700;
    font-size: 2rem;
    color: ${(props) => props.theme["base-subtitle"]};
  }

  .description {
    width: 90%;
    margin-inline: auto;
    text-align: center;
    font-size: 1.4rem;
    line-height: 130%;
    color: ${(props) => props.theme["base-label"]};
  }
`;

export const BoxInteraction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 38px;
  margin-top: 33px;
  gap: 23px;

  .interaction {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const BoxCountUnit = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: ${(props) => props.theme["base-button"]};
  padding: 12px 8px;
  border-radius: 6px;

  svg {
    fill: ${(props) => props.theme.purple};
    transition: 350ms ease-in-out;
  }
`;

export const ButtonBase = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: transparent;
`;

export const add = styled(ButtonBase)`
  padding: 2px;
  outline-color: red;

  background: transparent;
  &:active,
  &:focus {
    outline: none;
  }

  &:not([disabled]) {
    svg:hover {
      transform: scale(1.5);
      filter: brightness(0.5);
    }
  }
`;

export const subt = styled(ButtonBase)`
  background: transparent;
`;

export const ButtonAddToShoppingCart = styled(ButtonBase)`
  padding: 8px;
  background: ${props => props.theme["purple-dark"]};
  border-radius: 8px;

  width: 38px;
  height: 38px;

  svg {
    fill: ${props => props.theme.white};

    &:hover {
      transform: scale(1.5);
    }
  }
`;
