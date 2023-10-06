import crypto from 'node:crypto'

import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

export async function createUsersRouter(app: FastifyInstance) {
  // post create users
  app.post('/api/v1/users', async (request, reply) => {
    // schema de validação
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { name, email, password } = createUserBodySchema.parse(request.body)
    const id = crypto.randomUUID()

    await knex('Users').insert({
      id,
      name,
      email,
      password,
    })

    return reply.status(201).send(JSON.stringify({ id }))
  })
}
