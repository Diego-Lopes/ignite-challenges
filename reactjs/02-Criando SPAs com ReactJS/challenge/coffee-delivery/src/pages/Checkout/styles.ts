import styled from "styled-components";

export const CheckoutContainer = styled.div`
  @media screen and (min-width: 600px) {
    margin-inline: 7rem;
  }
`;

export const Content = styled.div`
  width: min(114rem, 100%);
  display: grid;
  grid-gap: 3.2rem;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  align-items: start;

  justify-items: center;
  margin-inline: auto;

  @media screen and (max-width: 764px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const Address = styled.div`
  .title {
    font-family: "Baloo 2", sans-serif;
    font-size: 1.8rem;
    line-height: 23.4px;
    margin-bottom: 15px;
    color: ${(props) => props.theme["base-subtitle"]};
  }

  .wrapper {
    width: 640px;
    padding: 4rem;
    background-color: ${(props) => props.theme["base-card"]};
    border-radius: 6px;

    .address {
      display: flex;
      align-items: flex-start;
      height: 44px;
      gap: 0.8rem;

      margin-bottom: 3.2rem;

      div > p {
        &:first-of-type {
          font-size: 1.6rem;
          line-height: 20.8px;
        }

        &:last-of-type {
          font-size: 1.4rem;
        }
      }

      svg {
        color: ${(props) => props.theme["yellow-dark"]};
      }
    }

    .boxInputs {
      input[type="text"] {
        border: 1px solid ${(props) => props.theme["base-button"]};
        padding: 12px;
        background: ${(props) => props.theme["base-input"]};

        font-size: 1.4rem;
        line-height: 18.2px;
        color: ${(props) => props.theme["base-label"]};

        &:nth-child(1) {
          width: 200px;
          margin-bottom: 16px;

          @media screen and (max-width: 600px) {
            width: 100%;
          }
        }
        &:nth-child(2) {
          width: 100%;
          margin-bottom: 16px;
        }
        &:nth-child(3) {
          width: 200px;
        }
        &:nth-child(4) {
          width: 200px;
          margin-right: 12px;
          @media screen and (max-width: 600px) {
            width: 100%;
          }
        }
        &:nth-child(5) {
          width: 276px;
          margin-right: 12px;

          @media screen and (max-width: 600px) {
            width: 75.5%;
            margin: 12px;
            margin-left: 0;
          }
        }
        &:nth-child(6) {
          width: 60px;
        }
      }

      & > div {
        display: flex;
        gap: 1.2rem;

        @media screen and (max-width: 600px) {
          flex-wrap: wrap;
        }

        .inputComplemento {
          width: 348px;
          display: block;
          position: relative;

          label {
            position: absolute;
            color: ${(props) => props.theme["base-label"]};
            font-size: 1.6rem;
            right: 1px;
            bottom: 0;
            z-index: 1;
            font-size: 1.2rem;
            line-height: 15.6px;
            padding-block: 1.4rem;
            padding-right: 1.4rem;
            transform: translate(-1%, -37%);
            background: ${(props) => props.theme["base-input"]};
          }
        }
      }
    }
  }

  .boxModePay {
    width: 640px;
    margin-top: 12px;
    border-radius: 6px;
    padding: 4rem;

    background-color: ${(props) => props.theme["base-card"]};

    .title {
      display: flex;
      align-items: flex-start;
      margin-bottom: 32px;

      svg {
        margin-right: 8px;
        color: ${(props) => props.theme.purple};
      }

      p:nth-child(1) {
        color: ${(props) => props.theme["base-subtitle"]};
        line-height: 20px;
      }
      p:nth-child(2) {
        font-size: 1.4rem;
        line-height: 18px;
      }
    }

    .boxOptions {
      display: flex;
      align-items: center;
      gap: 12px;

      button {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 12px;
        border: none;
        background: ${(props) => props.theme["base-button"]};
        border-radius: 6px;
        text-transform: uppercase;
        font-size: 1.2rem;
        padding: 1.6rem 0 1.6rem 1.6rem;
        width: 178.67px;
        height: 51px;
        transition: 350ms ease-in-out;
        cursor: pointer;

        svg {
          color: ${(props) => props.theme.purple};
        }

        &:hover {
          background: ${(props) => props.theme["base-hover"]};
        }

        &:focus {
          background: ${(props) => props.theme["purple-light"]};
        }
      }
    }

    @media screen and (max-width: 600px) {
      display: flex;
      width: 100%;
      .boxInfo {
        width: 100%;

        .boxOptions {
          flex-wrap: wrap;
          justify-content: center;
          button {
            width: 100%;
            justify-content: center;
          }
        }
      }
    }
  }
  @media screen and (max-width: 600px) {
    .wrapper {
      width: 100%;
    }
  }
`;

export const Form = styled.form`
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;

export const ShoppingCart = styled.div`
  .title {
    font-family: "Baloo 2", sans-serif;
    font-size: 1.8rem;
    line-height: 23.4px;
    margin-bottom: 15px;
    color: ${(props) => props.theme["base-subtitle"]};
  }

  .wrapperShoppingCart {
    background-color: ${(props) => props.theme["base-card"]};
    width: 448px;
    padding: 40px;
    border-top-right-radius: 44px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 44px;
    border-bottom-right-radius: 6px;

    @media screen and (max-width: 600px) {
      width: 100%;
      margin-left: 1rem;
    }
  }
`;

export const CardItem = styled.div`
  width: 368px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme["base-button"]};
  padding-bottom: 24px;
  margin-bottom: 24px;
  position: relative;

  @media screen and (max-width: 600px) {
    width: 320px;
  }

  img {
    width: 64px;
    height: 64px;
    margin-right: 20px;
  }

  .buttonOptions {
    width: 171px;
    display: flex;
    flex-wrap: wrap;

    p {
      display: block;
    }

    .buttons {
      display: flex;
      /* height: 50px; */
      gap: 8px;

      .trash {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 1.2rem;
        text-transform: uppercase;
        padding: 4px;
        border: none;
        border-radius: 6px;
        transition: 350ms ease-in-out;

        background-color: ${(props) => props.theme["base-button"]};

        svg {
          color: ${(props) => props.theme.purple};
        }

        &:hover {
          background-color: ${(props) => props.theme["base-hover"]};
        }
      }
    }
  }

  .valueUnit {
    position: absolute;
    top: 5px;
    right: 0;

    p {
      color: ${(props) => props.theme["base-text"]};
      font-weight: 700;
    }
  }
`;

export const DescriptionValues = styled.div`
  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:nth-child(2) {
      margin-top: 12px;
      margin-bottom: 12px;
    }
  }

  margin-bottom: 24px;

  div > h3 {
    font-size: 2rem;
    line-height: 130%;
  }
`;

export const Button = styled.button`
  padding: 12px 8px;
  width: 100%;
  max-width: 368px;
  height: 46px;
  border: none;
  border-radius: 6px;
  background: ${(props) => props.theme.yellow};
  text-transform: uppercase;
  color: ${(props) => props.theme.white};
  font-weight: 700;
  line-height: 160%;
  transition: 350ms ease-in-out;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme["yellow-dark"]};
  }
`;

export const BoxCountUnit = styled.div`
  display: flex;
  align-items: center;
  /* gap: 4px; */
  background-color: ${(props) => props.theme["base-button"]};
  padding: 6px 4px;
  border-radius: 6px;
  border: 1px solid transparent;
  transition: border-color 350ms ease-in-out;

  svg {
    fill: ${(props) => props.theme.purple};
    transition: 350ms ease-in-out;
  }

  &:hover {
    border: 1px solid ${(props) => props.theme["purple-dark"]};
  }

  .inputNumber {
    width: 21px;
    padding: 1px;
    background: transparent;
    border: none;
    font-size: 1.6rem;
    color: ${(props) => props.theme["base-title"]};
    font-weight: 400;

    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type="number"] {
      -moz-appearance: textfield;
    }

    &:focus {
      box-shadow: 0 0 0 0 #4b2995;
    }
  }
`;

export const ButtonBase = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: transparent;
  &[disabled] {
    cursor: not-allowed;
  }
  &:not([disabled]) {
    cursor: pointer;
  }
  &:focus {
    box-shadow: none;
  }
`;

export const add = styled(ButtonBase)`
  padding: 2px;

  background: transparent;

  &:not([disabled]) {
    svg:hover {
      transform: scale(1.5);
      filter: brightness(0.5);
    }
  }
`;

export const subt = styled(ButtonBase)`
  padding: 2px;

  background: transparent;

  &:not([disabled]) {
    svg:hover {
      transform: scale(1.5);
      filter: brightness(0.5);
    }
  }
`;
