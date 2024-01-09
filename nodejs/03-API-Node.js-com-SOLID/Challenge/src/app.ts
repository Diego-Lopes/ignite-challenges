import fastify from 'fastify'
import { appRoutes } from './http/routes'

// criando a aplicação
export const app = fastify()

app.register(appRoutes)
