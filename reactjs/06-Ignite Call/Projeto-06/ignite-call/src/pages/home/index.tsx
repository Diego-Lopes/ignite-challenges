import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'
import { Container, Hero, Preview } from './styles'
import preveiwImage from '../../assets/app-preview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import { NextSeo } from 'next-seo'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Agenda aí, do jeito fácil de fazer | Agenda aí"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
      />
      <Container>
        <Hero>
          <Heading as="h1" size="4xl">
            Agendamento descomplicado
          </Heading>
          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre
          </Text>
          <ClaimUsernameForm />
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
    </>
  )
}
