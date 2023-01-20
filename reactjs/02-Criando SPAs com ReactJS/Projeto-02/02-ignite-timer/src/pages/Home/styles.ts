import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: .5rem;
  font-weight: bold;
  text-transform: capitalize;
  cursor: pointer;

  color: ${props => props.theme["gray-100"]};

  &:disabled {
    filter: opacity(0.75);
    cursor: not-allowed;
  }
  transition: background-color, filter 350ms ease-in;
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${props => props.theme["green-500"]};


  &:not(:disabled):hover {
    background: ${props => props.theme["green-700"]};
  }
`;
export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${props => props.theme["red-500"]};


  &:not(:disabled):hover {
    background: ${props => props.theme["red-700"]};
  }
`;