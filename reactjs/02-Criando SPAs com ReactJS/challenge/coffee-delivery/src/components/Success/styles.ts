import styled from "styled-components";

export const ContainerSuccess = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 8rem;

  .containerText {
    width: min(144rem, 61.5%);
    margin-inline: auto;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  margin-inline: auto;
  gap: 25rem;
  margin-top: 4rem;

  .border {
    width: 50%;
    max-width: 526px;
    border-radius: 6px 36px;
    border-image: linear-gradient(to right, #dbac2c, #8047f8) 1;
    background-image: linear-gradient(to right, #dbac2c, #8047f8);
    /* border-image-source: linear-gradient(
      102.89deg,
      #dbac2c 2.61%,
      #8047f8 98.76%
    ); */
    padding: 1px;
  }

  .cardInfo {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    padding: 4rem;
    border-radius: 6px 36px;
    background-color: white;
  }

  .icons {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .img {
    width: 50%;
    img {
      width: 100%;
    }
  }
`;
