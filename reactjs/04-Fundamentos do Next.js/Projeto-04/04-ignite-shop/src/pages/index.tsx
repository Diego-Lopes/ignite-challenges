import { styled } from '@/styles'
import { HomeContainer, Product } from '@/styles/pages/home'
import { Inter } from 'next/font/google'
import Image from 'next/image'

import camiseta1 from '../assets/camisetas/1.png';
import camiseta2 from '../assets/camisetas/2.png';
import camiseta3 from '../assets/camisetas/3.png';
import camiseta4 from '../assets/camisetas/4.png';

const inter = Inter({ subsets: ['latin'] })
const Button = styled("button", {
  backgroundColor: '$green300'
})

export default function Home() {
  return (
      <HomeContainer>
        <Product>
          <Image src={camiseta1} width={520} height={480} alt={''} />
          <footer>
            <strong>Camisate X</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>
        <Product>
          <Image src={camiseta2} width={520} height={480} alt={''} />
          <footer>
            <strong>Camisate X</strong>
            <span>R$ 79,90</span>
          </footer>
        </Product>
      </HomeContainer>
  )
}
