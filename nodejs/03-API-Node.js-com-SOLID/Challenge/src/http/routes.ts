import { FastifyInstance } from 'fastify'
import { registerORG } from './controllers/organizations/register'

/**
 * @param app tipado com FastifyInstance faz com que podemos usar um register do fastify
 */

export async function appRoutes(app: FastifyInstance) {
  app.post('/organizations', registerORG)
}
