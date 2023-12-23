import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  /**
   * Padrão de pattern Factory
   */
  // pegando nosso caso de uso
  const searchGymUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await searchGymUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(201).send({
    checkInsCount,
  })
}
