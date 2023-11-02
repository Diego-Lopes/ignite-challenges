import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositoreis/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    // pegando as dependências de prisma respository, dependency pattern
    const prismaUsersRepository = new PrismaUsersRepository() // aqui podemos trocar fácil de ORM.
    /**
     * Pois a dependências direta do prisma não é mais possível, foi aplicado o conceito
     * repository pattern e uma das 5 regras do SOLID que é
     * D - Dependency inversion Principle
     * princípio da denpedência inversa
     */

    // instanciando a class use-case register com as dependências de prisma users repository
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    // verificamos se o erro tem a instância de user-already-exists-error
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    // return reply.status(500).send() // TODO: fix me

    /**
     * Para tratar error não conhecidos, e não generalizar com um
     * reply.status(500)
     * passamos um throw error, isso faz com que a camada acima trate esse
     * erro que é o fastfy.
     */
    throw error
  }

  return reply.status(201).send()
}
