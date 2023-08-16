import { Avatar, Heading, Text } from '@ignite-ui/react'
import { Container, UserHeader } from './styles'
import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '@/lib/prisma'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatatUrl: string
  }
}

export default function Schedule({ user }: ScheduleProps) {
  return (
    <Container>
      <UserHeader>
        <Avatar src={user.avatatUrl} />
        <Heading>{user.name}</Heading>
        <Text>{user.bio}</Text>
      </UserHeader>
    </Container>
  )
}
/**
 * usamos paths com array vazio para renderizar assim que o usuário acessar, pensando
 * em escala maior.
 * fallback: blocking ele vai mostar os dados assim que buscar tudo do back ele
 * bloqueia a renderização dos elementos até que seja concluído.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

// Comportamento de pagina estática
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  // fazendo uma requisição ao banco usando prisma
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  // caso não encontre um usuário retorn um erro.
  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // 1 dia
  }
}
