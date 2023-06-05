import { globalStyles } from "@/styles/global";
import { Container, Header, ShoppingCart } from "@/styles/pages/app";
import type { AppProps } from "next/app";
import logoImg from "../assets/logo.svg";
import Image from "next/image";
import { ShoppingcartLocalStorageProvider } from "@/context/shoppingcart";
import { ModalShoppingCart } from "@/components/modaShopCart";
globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
        <ModalShoppingCart />
      </Header>
      <ShoppingcartLocalStorageProvider>
        <Component {...pageProps} />
      </ShoppingcartLocalStorageProvider>
    </Container>
  );
}
