import styled from "styled-components";

export const BannerContainer = styled.div`
  background-image: url("/assets/img/Background.png");
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
  height: 54.4rem;

  display: flex;
  align-items: center;

  @media screen and (max-width: 520px) {
    height: fit-content;
  }
`;

export const Content = styled.div`
  width: min(112rem, 100%);
  margin-inline: auto;

  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (max-width: 520px) {
    flex-direction: column;
  }
`;

export const WrapperTexts = styled.div`
  width: 55%;

  .title {
    font-family: "Baloo 2", sans-serif;
    font-weight: 800;
    font-size: 4.8rem;
    line-height: 62.4px;
    color: ${(props) => props.theme["base-title"]};
  }

  .description {
    margin-top: 1.6rem;
    font-size: 2rem;
    line-height: 26px;
    color: ${(props) => props.theme["base-subtitle"]};
  }

  .boxIcons {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem 4rem;
    margin-top: 6.6rem;

    .icon {
      width: 45%;
      display: flex;
      align-items: center;
      gap: 1.2rem;

      p {
        /* width: 18.7rem; */
        font-size: 1.6rem;
        line-height: 20.8px;
        color: ${(props) => props.theme["base-text"]};
      }
    }

    @media screen and (max-width: 600px) {
      margin-top: 3.6rem;

      gap: 1rem 1rem;
      .icon {
        width: 70%;
      }
    }
  }

  @media screen and (max-width: 520px) {
    width: 90%;

    .title {
      font-weight: 800;
      font-size: 3.2rem;
      line-height: 110%;
    }
  }
`;

export const WrapperImg = styled.div`
  width: 45%;
  display: flex;
  justify-content: center;

  img {
    width: 476px;
    height: 360px;
  }
`;
