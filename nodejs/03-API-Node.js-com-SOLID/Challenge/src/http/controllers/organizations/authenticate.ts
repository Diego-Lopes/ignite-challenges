import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentials } from '@/use-cases/errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { password, email } = authenticateBodySchema.parse(request.body)

  try {
    const organizationsRepository = new PrismaOrganizationsRepository()
    const authenticateUseCase = new AuthenticateUseCase(organizationsRepository)

    const { organization } = await authenticateUseCase.execute({
      password,
      email,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentials) {
      return reply.status(400).send({ message: error.message })
    }

    return error
  }
}
