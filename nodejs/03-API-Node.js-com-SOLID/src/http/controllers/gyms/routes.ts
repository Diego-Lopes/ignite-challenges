import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function gymsRouters(app: FastifyInstance) {
  // no fastify addHook faz o papel de middlewares
  app.addHook('onRequest', verifyJWT) // todas as rotas vão chamar o validador de token jwt.
}
