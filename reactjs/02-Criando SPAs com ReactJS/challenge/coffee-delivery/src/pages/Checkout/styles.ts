import styled from "styled-components";

export const CheckoutContainer = styled.div`
  width: 100%;

  @media screen and (min-width: 600px) {
    margin-inline: 7rem;
  }
`;

export const Content = styled.div`
  width: min(194rem, 100%);
  display: grid;
  grid-gap: 3.2rem;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  margin-inline: auto;
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
        }
        &:nth-child(5) {
          width: 276px;
          margin-right: 12px;
        }
        &:nth-child(6) {
          width: 60px;
        }
      }

      & > div {
        display: flex;
        gap: 1.2rem;

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
  }
`;

export const Form = styled.form``;

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
  }
`;

export const CardItem = styled.div`
  width: 368px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme["base-button"]};
  padding-bottom: 24px;
  margin-bottom: 24px;

  img {
    width: 64px;
    height: 64px;
    margin-right: 20px;
  }

  .buttonOptions {
    width: 171px;
    display: flex;
    flex-wrap: wrap;
  }
`;
