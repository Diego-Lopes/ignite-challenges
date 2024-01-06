import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

// criando a aplicação
export const app = fastify()

app.post('/organizations', async (request, reply) => {
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

  await prisma.organization.create({
    data: {
      user_name: userName,
      password_hash: password,
      title,
      city,
      description,
      email,
      latitude,
      longitude,
      phone,
      role,
      state,
    },
  })

  return reply.status(201).send()
})
