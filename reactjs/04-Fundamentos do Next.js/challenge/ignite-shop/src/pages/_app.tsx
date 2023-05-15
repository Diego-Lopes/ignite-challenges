import { globalStyles } from "@/styles/global";
import { Container, Header, ShoppingCart } from "@/styles/pages/app";
import type { AppProps } from "next/app";
import Image from "next/image";
import { ShoppingcartLocalStorageProvider } from "@/context/shoppingcart";
import * as Dialog from "@radix-ui/react-dialog";
import { HeaderComponent } from "@/components/Header";
globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <HeaderComponent/>
      </Header>
      <ShoppingcartLocalStorageProvider>
        <Component {...pageProps} />
      </ShoppingcartLocalStorageProvider>
    </Container>
  );
}
