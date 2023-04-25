import { globalStyles } from "@/styles/global";
import { Container, Header } from "@/styles/pages/app";
import type { AppProps } from "next/app";
import Image from "next/image";
import logoImg from "../assets/logo.svg";
import { ShoppingcartLocalStorageProvider } from "@/context/shoppingcart";
globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>
      <ShoppingcartLocalStorageProvider>
        <Component {...pageProps} />
      </ShoppingcartLocalStorageProvider>
    </Container>
  );
}
