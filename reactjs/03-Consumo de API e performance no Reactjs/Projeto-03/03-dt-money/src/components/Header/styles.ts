import styled from 'styled-components'

export const ContainerHeader = styled.header`
  background-color: ${(props) => props.theme['gray-900']};
  padding: 2.5rem 0 7.5rem;
`

export const HeaderContent = styled.div`
  /* width: 100%;
  max-width: 1120px; */
  width: min(1120px, 100%);
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const NewTransactionButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  font-weight: 700;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme['green-700']};
    transition: background-color 0.2s ease-in-out;
  }
`
