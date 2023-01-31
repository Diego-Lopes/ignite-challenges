import styled from "styled-components";
interface CicleIconsContainerProps {
  color: string;
}
export const ClicleIconsContainer = styled.div<CicleIconsContainerProps>`
  padding: .8rem;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 1000px;
  background: ${props => props.color};
`;