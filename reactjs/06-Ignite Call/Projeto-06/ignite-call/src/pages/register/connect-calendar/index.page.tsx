import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { Container, Header } from '../styles'
import { ArrowRight, Check } from 'phosphor-react'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Register() {
  const session = useSession()
  const router = useRouter()

  console.log(session)

  // tratativa de error via query
  const hasAuthError = !!router.query.error
  // verificando se está autenticado
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  async function handleNavigateToNextStep() {
    await router.push('/register/time-intervals')
  }

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
          {isSignedIn ? (
            <Button variant="secondary" size="sm" disabled>
              Conectado
              <Check weight="bold" />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight weight="bold" />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="md">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </AuthError>
        )}

        <Button
          onClick={() => handleNavigateToNextStep()}
          type="submit"
          disabled={!isSignedIn}
        >
          Próximo passo
          <ArrowRight weight="bold" />
        </Button>
      </ConnectBox>
    </Container>
  )
}
