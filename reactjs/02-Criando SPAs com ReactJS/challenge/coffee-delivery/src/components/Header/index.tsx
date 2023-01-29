import * as S from './styles';
import { MapPin, ShoppingCart } from 'phosphor-react';
import logo from '../../../src/assets/Logo.svg';
export function Header() {
  return (
    <S.HeaderContainer>
      <S.Wrapper>
        <img src={logo} alt="Logo Coffe Delivery" />
        <S.BoxButons>
          <S.ButtonLocal>
            <MapPin size={22} weight="fill" />
            Ji-Paraná/RO
          </S.ButtonLocal>
          <S.ButtonCheckout>
            <ShoppingCart size={22} weight="fill" />
          </S.ButtonCheckout>
        </S.BoxButons>
      </S.Wrapper>
    </S.HeaderContainer>
  )
}