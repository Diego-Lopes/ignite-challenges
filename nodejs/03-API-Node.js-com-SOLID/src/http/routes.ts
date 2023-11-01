import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'

export async function appRouter(app: FastifyInstance) {
  // rota cadastrar usuário
  app.post('/users', register)
}
