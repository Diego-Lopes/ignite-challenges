import fastify from 'fastify'
import { appRouter } from './http/routes'
export const app = fastify()

app.register(appRouter)
