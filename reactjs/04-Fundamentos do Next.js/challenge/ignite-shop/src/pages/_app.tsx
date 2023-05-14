import { globalStyles } from "@/styles/global";
import { Container, Header, ShoppingCart } from "@/styles/pages/app";
import type { AppProps } from "next/app";
import Image from "next/image";
import logoImg from "../assets/logo.svg";
import bagDark from "../../public/BagDark.svg";
import { ShoppingcartLocalStorageProvider } from "@/context/shoppingcart";
import * as Dialog from "@radix-ui/react-dialog";
globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ShoppingCart onClick={() => console.log("clicou, header")}>
              <Image src={bagDark} alt="" />
              <div className="value">100</div>
            </ShoppingCart>
          </Dialog.Trigger>
          <modalShoppingCard />
        </Dialog.Root>
      </Header>
      <ShoppingcartLocalStorageProvider>
        <Component {...pageProps} />
      </ShoppingcartLocalStorageProvider>
    </Container>
  );
}
