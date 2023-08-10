import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { Container, Header } from '../styles'
import { ArrowRight } from 'phosphor-react'
// import { api } from '@/lib/axios'
import { ConnectBox, ConnectItem } from './styles'
import { signIn } from 'next-auth/react'

export default function Register() {
  // async function handleRegister(data: RegisterFormData) {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda</Heading>
        <Text>
          Conect o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => signIn('google')}
          >
            Conectar
            <ArrowRight weight="bold" />
          </Button>
        </ConnectItem>
        <Button type="submit">
          Próximo passo
          <ArrowRight weight="bold" />
        </Button>
      </ConnectBox>
    </Container>
  )
}
