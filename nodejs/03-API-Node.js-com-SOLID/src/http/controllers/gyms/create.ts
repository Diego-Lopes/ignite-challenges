import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    /**
     * quando precisamos fazer uma validação que não é padrão do zod podemos usar
     * .refine(), refine acessa o valor do objeto em uma arrow function no retorno
     * da arrow function devolvemos um booleano.
     *
     * latitude não passa de 90, porém ele é representado 90 e -90
     * para resolver isso podemos usar o método .abs(), abs é abreviação de
     * absolute, o absolute ele converte número negativos em positivos e se
     * for positivo mantém-se positivo.
     */
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, latitude, longitude, phone } =
    createGymBodySchema.parse(request.body)

  /**
   * Padrão de pattern Factory
   */
  // pegando nosso caso de uso makeCreate
  const createGymUseCase = makeCreateGymUseCase()

  await createGymUseCase.execute({
    title,
    description,
    phone,
    longitude,
    latitude,
  })

  return reply.status(201).send()
}
