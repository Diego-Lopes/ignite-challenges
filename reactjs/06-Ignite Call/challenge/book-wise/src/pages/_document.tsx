import { getCssText } from '@/styles'
import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <style id='stitches' dangerouslySetInnerHTML={{__html: getCssText()}}/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
