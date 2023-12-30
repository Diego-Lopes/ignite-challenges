import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  // precisamos saber qual usuário está autenticado
  // console.log(request.headers)

  /**
   * Esta função jwtVerify faz duas funções
   * 1 busca o token no cabeçalho, encontando o token no cabeçalho ela vai validar com o segredo do token,
   * essa função não encontranto um token no cabeçalho já retorna um erro.
   *
   * 2 função jwtVerify faz uma busca nos dados do token encontrado e adiciona em user.
   */

  // console.log(request.user.sub)
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
