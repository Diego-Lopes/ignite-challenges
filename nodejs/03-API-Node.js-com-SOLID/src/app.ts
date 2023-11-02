import fastify from 'fastify'
import { appRouter } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'
export const app = fastify()

app.register(appRouter)

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
