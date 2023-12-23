import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'

export async function gymsRouters(app: FastifyInstance) {
  // no fastify addHook faz o papel de middlewares
  app.addHook('onRequest', verifyJWT) // todas as rotas vão chamar o validador de token jwt.

  // criando as rotas
  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', create)
}
