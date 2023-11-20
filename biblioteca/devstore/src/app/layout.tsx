import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
/**
 * Definindo a fonte em uma variável global chamamos de --font-inter,
 * assim possibilita no arquivo tailwind.config.ts definirmos font famili sans:
 * com nossa variavel --font-inter.
 */
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'devstore',
  description: 'Sua loja oficial Dev.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className={inter.variable}>
      <body className="bg-zinc-950 text-zinc-50 antialiased">{children}</body>
    </html>
  )
}
