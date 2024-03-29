import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'

export async function registerORG(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string(),
    email: z.string().email(),
    state: z.string(),
    city: z.string(),
    latitude: z
      .number()
      .refine((value) => {
        return Math.abs(value) <= 90
      })
      .nullable(),
    longitude: z
      .number()
      .refine((value) => {
        return Math.abs(value) <= 180
      })
      .nullable(),
    userName: z.string(),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'ORG', 'USER']),
  })

  const {
    userName,
    password,
    title,
    city,
    state,
    description,
    email,
    latitude,
    longitude,
    phone,
    role,
  } = registerBodySchema.parse(request.body)

  try {
    const organizationsRepository = new PrismaOrganizationsRepository()
    const registerUseCase = new RegisterUseCase(organizationsRepository)

    const { organization } = await registerUseCase.execute({
      userName,
      password,
      title,
      city,
      state,
      description,
      email,
      latitude,
      longitude,
      phone,
      role,
    })

    return reply.status(201).send({ id: organization.id })
  } catch (error) {
    if (error instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    return reply.status(500).send()
  }
}
