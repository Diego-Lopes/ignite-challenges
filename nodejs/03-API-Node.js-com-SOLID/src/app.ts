import fastify from 'fastify'
import { usersRouters } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { gymsRouters } from './http/controllers/gyms/routes'
export const app = fastify()

app.register(gymsRouters)
app.register(usersRouters)

// adicionando funcionalidade do jwt
// passamos um objeto como segundo parâmetros com as configuração.
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
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
