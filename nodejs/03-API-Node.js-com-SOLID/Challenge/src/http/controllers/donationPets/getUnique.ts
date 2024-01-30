import { ErrorGeneric } from '@/use-cases/errors/error-generic'
import { NotExistDonationPet } from '@/use-cases/errors/not-exists-donation-pet-by-characteristic copy'
import { makeGetUniqueDonationPetUseCase } from '@/use-cases/factories/make-get-unique-donation-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getUniqueDonationPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerDonationPetSchema = z.object({
    id: z.string().trim(),
  })

  const { id } = registerDonationPetSchema.parse(request.params)
  console.log(id)

  const getUniqueDonationPetUseCase = makeGetUniqueDonationPetUseCase()

  try {
    if (id !== undefined) {
      const donationPets = await getUniqueDonationPetUseCase.execute({
        id,
      })
      return reply.status(200).send(donationPets)
    }
  } catch (error: any) {
    if (error instanceof ErrorGeneric) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof NotExistDonationPet) {
      return reply.status(404).send({ message: error.message })
    }

    return error
  }
}
