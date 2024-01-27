import { ErrorBlankField } from '@/use-cases/errors/error-blank-field'
import { NotExistDonationPetByCity } from '@/use-cases/errors/not-exists-donation-pet-by-city'
import { makeGetAllDonationPetUseCase } from '@/use-cases/factories/make-get-all-donation-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getAllDonationPets(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerDonationPetSchema = z.object({
    city: z.string(),
  })

  const { city } = registerDonationPetSchema.parse(request.query)
  console.log(city)

  const getAllDonationPetUseCase = makeGetAllDonationPetUseCase()

  try {
    const donationPets = await getAllDonationPetUseCase.execute({
      city,
    })

    return reply.status(200).send(donationPets)
  } catch (error: any) {
    if (error instanceof NotExistDonationPetByCity) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof ErrorBlankField) {
      return reply.status(404).send({ message: error.message })
    }

    return reply.status(404).send({ message: error.message })
  }
}
