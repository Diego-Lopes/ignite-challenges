import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import { Container } from "../styles/pages/app";
import { ProSidebarProvider } from "react-pro-sidebar";
import Sidebar from "../components/Sidebar";
import { CartProvider } from "use-shopping-cart";
import Header from "../components/Header";

globalStyles();

const stripeKey = process.env.STRIPE_SECRET_KEY

export default function App({ Component, pageProps }: AppProps) {
   return (
    <CartProvider
      cartMode="checkout-session" stripe={stripeKey} currency="BRL" shouldPersist={true}
    >
      <ProSidebarProvider>
          <Sidebar />
          <Container>
          <Header />
          <Component {...pageProps} />
        </Container>
      </ProSidebarProvider>
    </CartProvider>
   )
}