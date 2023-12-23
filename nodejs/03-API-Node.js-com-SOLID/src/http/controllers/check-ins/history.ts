import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    /**
     * .coerce facilita a transformação de um string em outros
     * tipos válidos como boolean, number.
     */
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  /**
   * Padrão de pattern Factory
   */
  // pegando nosso caso de uso makeCreate
  const searchGymUseCase = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await searchGymUseCase.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(201).send({
    checkIns,
  })
}
