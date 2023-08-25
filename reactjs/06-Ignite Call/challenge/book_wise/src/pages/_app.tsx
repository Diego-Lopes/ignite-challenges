import type { AppProps } from "next/app";
import { Nunito } from "@next/font/google";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${Nunito.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
