import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

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
          sub: user.id,
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
          sub: user.id,
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
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}
