import logo from '@assets/logo.png';
import avatar from '@assets/perfil.png';
import { Avatar, Container, Logo } from "./styles";
export function Header() {
  return (
    <Container>
      <Logo source={logo} />
      <Avatar source={avatar}/>
    </Container>
  )
}