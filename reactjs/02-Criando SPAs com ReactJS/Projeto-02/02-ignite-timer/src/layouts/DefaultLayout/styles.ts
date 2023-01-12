import styled from 'styled-components';


export const LayoutContainer = styled.div`
  transition: 650ms linear;
  max-width: 74rem;
  height: calc(100vh - 10rem);
  margin: 5rem auto;

  background: ${props => props.theme['gray-800']};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`;
