import { styled } from '@/styles'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const Button = styled("button", {
  backgroundColor: '$green300'
})
export default function Home() {
  return (
    <>
      <Button>Enviar</Button>
    </>
  )
}
