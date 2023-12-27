import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true }) // verificando nos cookie only

  // implementando o token

  /**
   * como registranmos o @fastify/jwt no app agora temos as funcionalidades
   * no reply.
   * jwtSigin() recebe 2 parâmetros
   */
  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  /**
   * Adicionando um refresh token, continuamos associando com o id do usuário
   * logado.
   * o refresh token ele tem uma data de expiração maior que o token.
   * ou seja, se o usuário ficar 7 dias sem entrar na aplicação ele terá que
   * refazer a autenticação.
   */
  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  /**
   * O setCookie vamos enviar o refresh token de modo manter no contexto
   * da requisição.
   *
   *
   * sercure: (boolean): ai ser encriptografado no https, o front não conseguir ler como se fosse ums simple string, pois estará encriptografada com recurso do https
   * httpOnly:(boolean): significa que só vai ser acessivel pelo backend da aplicação
   */

  return reply
    .status(200)
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      httpOnly: true,
    })
    .send({ token })
}
