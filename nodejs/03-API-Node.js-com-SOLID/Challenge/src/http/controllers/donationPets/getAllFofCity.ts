import { ErrorBlankField } from '@/use-cases/errors/error-blank-field'
import { ErrorGeneric } from '@/use-cases/errors/error-generic'
import { NotExistDonationPetByCharacteristic } from '@/use-cases/errors/not-exists-donation-pet-by-characteristic'
import { NotExistDonationPetByCity } from '@/use-cases/errors/not-exists-donation-pet-by-city'
import { makeGetAllDonationPetByCharacteristicUseCase } from '@/use-cases/factories/make-get-all-donation-pet-by-characteristic-use-case'
import { makeGetAllDonationPetUseCase } from '@/use-cases/factories/make-get-all-donation-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getAllDonationPets(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerDonationPetSchema = z.object({
    city: z.string().trim().optional(),
    q: z.string().trim().optional(),
  })

  const { q } = registerDonationPetSchema.parse(request.query)
  console.log(q)

  const getAllDonationPetByCharacteristicUseCase =
    makeGetAllDonationPetByCharacteristicUseCase()

  const { city } = registerDonationPetSchema.parse(request.query)
  console.log(city)

  const getAllDonationPetUseCase = makeGetAllDonationPetUseCase()

  try {
    if (city !== undefined) {
      const donationPets = await getAllDonationPetUseCase.execute({
        city,
      })
      return reply.status(200).send(donationPets)
    }

    if (q !== undefined) {
      const donationPetsCharacteristic =
        await getAllDonationPetByCharacteristicUseCase.execute({
          q,
        })
      return reply.status(200).send(donationPetsCharacteristic)
    }
  } catch (error: any) {
    if (error instanceof ErrorGeneric) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof NotExistDonationPetByCity) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof NotExistDonationPetByCharacteristic) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof ErrorBlankField) {
      return reply.status(404).send({ message: error.message })
    }

    return error
  }
}
