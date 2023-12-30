import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { usersRoutes } from './http/controllers/users/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'
export const app = fastify()

// fazendo o cadastro no app.
app.register(fastifyCookie)
app.register(gymsRoutes)
app.register(usersRoutes)
app.register(checkInsRoutes)

// adicionando funcionalidade do jwt
// passamos um objeto como segundo parâmetros com as configuração.
/**
 * Implementando estratégia de refresh de token
 * módulo 7 do ignite.
 * Para revalidar o token do usuário o tempo tem que ser curto,
 * para que possamos sempre validar que esse usuário está ativo.
 * vou verificar acada 10 minute e gerar novo token válido para ele.
 *
 * cookien: pegamos o nome do cookie refresh token e setamos signed: com false.
 * signed: assinatura é quando pegamos uma informação e faz um processo de hash nela,
 * a gente assina para que depois seja possível validar que a informação foi gerada
 * pelo nosso backend.
 */
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

// Criando uma tratativa de erros global
app.setErrorHandler((error, _, reply) => {
  // error de instância zod
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  // implementando console.error em ambiente de desenvolvimento.
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here me should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
