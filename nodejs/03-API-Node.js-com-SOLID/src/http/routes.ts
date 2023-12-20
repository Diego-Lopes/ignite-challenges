import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRouter(app: FastifyInstance) {
  // rota criar um novo usuário
  app.post('/users', register)

  // fazer login na aplicação.
  app.post('/sessions', authenticate)

  /**
   * As rotas abaixo só poderem ser chamadas se o usuário estiver autenticado.
   * adicionando middleware de verificação jwt, abrindo objeto de configuração
   * e chamando onRequest: abrindo calchetes e passando verifyJWT
   */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
