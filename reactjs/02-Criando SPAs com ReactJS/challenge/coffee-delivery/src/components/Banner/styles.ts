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
`;

export const WrapperTexts = styled.div`
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
`;
