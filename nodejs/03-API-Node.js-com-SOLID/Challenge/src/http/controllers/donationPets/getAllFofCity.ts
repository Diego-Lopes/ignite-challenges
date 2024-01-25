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
    await getAllDonationPetUseCase.execute({
      city,
    })
  } catch (error) {
    if (error instanceof NotExistDonationPetByCity) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }

  return reply.status(201).send()
}
