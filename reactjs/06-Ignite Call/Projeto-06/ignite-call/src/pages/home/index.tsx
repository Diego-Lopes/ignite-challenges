import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'
import { Container, Hero, Preview } from './styles'
import preveiwImage from '../../assets/app-preview.png'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre
        </Text>
      </Hero>

      <Preview>
        <Image
          src={preveiwImage}
          alt="Calendário simbolizando aplicação em funcionamento"
          quality={100}
          height={400}
          priority
        />
      </Preview>
    </Container>
  )
}
