import { FastifyInstance } from 'fastify'
import { register } from './register'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { authenticate } from './authenticate'

export async function usersRouters(app: FastifyInstance) {
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
