import crypto from 'node:crypto'

import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function createUsersRouter(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    console.log(`[${request.method}] ${request.url}`)
  })

  // get users
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const users = await knex('users').select()
      return users
    },
  )

  // post create users
  app.post('/', async (request, reply) => {
    // schema de validação
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { name, email, password } = createUserBodySchema.parse(request.body)
    // const id = crypto.randomUUID()

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = crypto.randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    // verificar se o usuário já está no banco de dados.
    const userExists = await knex('users').where({ email }).first()

    if (userExists) {
      return reply.status(401).send({
        error: 'E-mail already exists',
      })
    }

    await knex('users').insert({
      // id,
      name,
      email,
      password,
      session_id: sessionId,
    })

    // return reply.status(201).send(JSON.stringify({ id, sessionId }))
    return reply.status(201).send(JSON.stringify({ sessionId }))
  })
}
