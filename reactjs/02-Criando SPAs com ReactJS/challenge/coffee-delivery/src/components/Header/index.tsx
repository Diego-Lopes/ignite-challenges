import * as S from './styles';
import logo from '../../../src/assets/Logo.svg';
export function Header() {
  return (
    <S.HeaderContainer>
      <img src={logo} alt="Logo Coffe Delivery" />
    </S.HeaderContainer>
  )
}