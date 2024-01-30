import { FastifyInstance } from 'fastify'
import { registerORG } from './register'
import { authenticate } from './authenticate'

/**
 * @param app tipado com FastifyInstance faz com que podemos usar um register do fastify
 */

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/organizations', registerORG)
  app.post('/sessions', authenticate)
}
