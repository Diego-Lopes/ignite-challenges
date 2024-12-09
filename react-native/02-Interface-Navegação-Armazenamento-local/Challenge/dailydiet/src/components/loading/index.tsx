import logoIcon from '@assets/icon.png';
import { Container, Logo, Text } from "./styles";
export function Loading() {
  return(
    <Container>
      <Logo source={logoIcon} />
      <Text>Carregando...</Text>
    </Container>
  )
}