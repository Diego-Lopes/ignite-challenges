import * as S from "./styles";
import { MapPin, ShoppingCart } from "phosphor-react";
import logo from "../../../src/assets/Logo.svg";
import { useEffect } from "react";
export function Header() {
  useEffect(() => {
    let isManyInTheCart = JSON.parse(
      String(window.localStorage.getItem("@ignite-CoffeeDelivry:order-1.0"))
    );
  }, []);

  return (
    <S.HeaderContainer>
      <S.Wrapper>
        <img src={logo} alt="Logo Coffe Delivery" />
        <S.BoxButons>
          <S.ButtonLocal>
            <MapPin size={22} weight="fill" />
            Ji-Paraná/RO
          </S.ButtonLocal>
          <S.ButtonCheckout howManyInTheCart={0}>
            <ShoppingCart size={22} weight="fill" />
          </S.ButtonCheckout>
        </S.BoxButons>
      </S.Wrapper>
    </S.HeaderContainer>
  );
}
