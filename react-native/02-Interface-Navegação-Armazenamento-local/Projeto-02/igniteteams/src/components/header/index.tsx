import logoImage from '@assets/logo.png';
import { Container, Logo } from "./style";

export function Header() {
  return (
    <Container>
      <Logo source={logoImage} />
    </Container>
  )
}