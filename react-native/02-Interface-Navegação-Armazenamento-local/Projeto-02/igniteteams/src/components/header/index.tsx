import logoImage from '@assets/logo.png';
import { BackButton, BackIcon, Container, Logo } from "./style";


type HeaderProps = {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: HeaderProps) {
  return (
    <Container>
      {
        showBackButton &&
        <BackButton>
          <BackIcon />
        </BackButton>
      }
      <Logo source={logoImage} />
    </Container>
  )
}