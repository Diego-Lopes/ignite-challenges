import { Scroll, Timer } from 'phosphor-react';
import logoIgnite from '../../assets/logo.svg';
import { HeaderContainer } from "./styles";
export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />
      <nav>
        <a href=""><Timer size={24} color={"white"} /></a>
        <a href=""><Scroll size={24} color={"white"}/></a>
      </nav>
    </HeaderContainer>
  )
}