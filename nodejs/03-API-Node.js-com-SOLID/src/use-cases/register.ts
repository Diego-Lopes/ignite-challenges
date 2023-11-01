import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisteruserCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisteruserCaseRequest) {
  const password_hash = await hash(password, 6)
  /**
   * hash("", round)
   * 1 parâmetro temos nosso valor da password
   * 2 parâmetro temos nosso round que nada mais é que pegar o valor do 1 round
   * e concatenar com segundo round quando for chamado novamente e assim
   * até chegar ao limite que é 6 como acima.
   */

  // validar se há email existente

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
