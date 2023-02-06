import styled from "styled-components";

export const BannerContainer = styled.div`
  background-image: url("/assets/img/Background.png");
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
  height: 54.4rem;
`;

export const Content = styled.div`
  width: min(112rem, 100%);
  margin-inline: auto;

  display: flex;
  align-items: center;
  /* justify-content: center; */
`;

export const WrapperTexts = styled.div`
  width: 50%;
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

    .icon {
      width: 45%;
      display: flex;
      align-items: center;
      gap: 1.2rem;

      p {
        /* width: 18.7rem; */
        font-size: 1.6rem;
        line-height: 20.8px;
        color: ${props => props.theme["base-text"]};
      }
    }
  }
`;

export const WrapperImg = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  
  img {
    width: 476px;
    height: 360px;
  }


`;
