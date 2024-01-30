import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { donationPetRoutes } from './http/controllers/donationPets/routes'
import { organizationRoutes } from './http/controllers/organizations/routes'
import fastifyJwt from '@fastify/jwt'

// criando a aplicação
export const app = fastify()

// implementando jwt do fastify
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(donationPetRoutes)
app.register(organizationRoutes)

// colocando error global troca o request para _, quando não estamos usando a variável.
app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // todo: aqui nós podemos usar um ferramenta de observalibidade externa como DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})
