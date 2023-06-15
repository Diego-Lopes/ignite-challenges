import Link from 'next/link'
import {CartContainer, Header as HeaderContainer} from './style'
import { ShoppingCart } from "phosphor-react";
import Image from "next/image";
import logoImg from '../../assets/logo.svg';
import { useProSidebar } from 'react-pro-sidebar';
import { useShoppingCart } from 'use-shopping-cart';





export default function Header() {
  const {collapseSidebar } = useProSidebar();
  const {cartCount} = useShoppingCart();

    return (
        <HeaderContainer>
            <Link href="/">
              <Image src={logoImg} alt="" />
            </Link>
            <CartContainer onClick={() => {collapseSidebar()}}>
              <ShoppingCart size={32} />
              <p>{cartCount}</p>
            </CartContainer>
          </HeaderContainer>
    )
}