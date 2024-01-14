import { makeDonationPetUseCase } from '@/use-cases/factories/make-create-donation-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerDonationPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerDonationPetSchema = z.object({
    name: z.string().min(3),
    species: z.string().min(1),
    age: z.number(),
    description: z.string(),
    state: z.string(),
    city: z.string(),
    adopted: z.boolean().default(false),
    images: z.string().array(),
    organizationId: z.string(),
  })

  const {
    name,
    age,
    adopted,
    city,
    description,
    images,
    organizationId,
    species,
    state,
  } = registerDonationPetSchema.parse(request.body)

  const donationPetUseCase = makeDonationPetUseCase()

  await donationPetUseCase.execute({
    name,
    age,
    adopted,
    city,
    description,
    images,
    organizationId,
    species,
    state,
  })

  return reply.status(201).send()
}
