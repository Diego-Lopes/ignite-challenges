import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { createUsersRouter } from './routes/createUsers'
import { CreateMeals } from './routes/registerMeals'
import { metricsMeals } from './routes/metricsMeals'

export const app = fastify()

app.register(cookie)

app.register(createUsersRouter, {
  prefix: '/api/v1/users',
})

app.register(CreateMeals, {
  prefix: '/api/v1/meals',
})

app.register(metricsMeals, {
  prefix: '/api/v1/metrics',
})
