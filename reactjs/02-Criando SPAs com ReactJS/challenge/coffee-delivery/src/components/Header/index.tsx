import * as S from "./styles";
import { MapPin, ShoppingCart } from "phosphor-react";
import logo from "../../../src/assets/Logo.svg";
import { useContext } from "react";
import { StorageContext } from "../../context/StorageContext";
import { NavLink } from "react-router-dom";
export function Header() {
  const { countInTheCart } = useContext(StorageContext);

  function handleScroll() {
    const header = document.querySelector("header") as HTMLElement;

    if (window.pageYOffset > header.offsetTop) {
      header.classList.add("fixed-header");
    } else {
      header.classList.remove("fixed-header");
    }
  }

  window.addEventListener("scroll", handleScroll);
  return (
    <S.HeaderContainer>
      <S.Wrapper>
        <img src={logo} alt="Logo Coffe Delivery" />
        <S.BoxButons>
          <S.ButtonLocal>
            <MapPin size={22} weight="fill" />
            Ji-Paraná/RO
          </S.ButtonLocal>
          {countInTheCart > 0 ? (
            <NavLink to="/checkout">
              <S.ButtonCheckout howManyInTheCart={countInTheCart}>
                <ShoppingCart size={22} weight="fill" />
              </S.ButtonCheckout>
            </NavLink>
          ) : (
            <S.ButtonCheckout>
              <ShoppingCart size={22} weight="fill" />
            </S.ButtonCheckout>
          )}
        </S.BoxButons>
      </S.Wrapper>
    </S.HeaderContainer>
  );
}
