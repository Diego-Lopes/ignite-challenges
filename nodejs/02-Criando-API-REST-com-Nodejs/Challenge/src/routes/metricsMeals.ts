import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

export async function metricsMeals(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    console.log(`[${request.method}] ${request.url}`)
  })

  // Route of metrics related to the meals
  app.get('/meals', async (request, reply) => {
    const { sessionId } = request.cookies

    console.log({ sessionId })

    const sum = await knex('meals')
      .where('user_session_id', sessionId)
      .count('id', { as: 'count' })

    const [count] = sum
    console.log(count)
    return reply.status(200).send(count)
  })

  // Route of metric related to the meals in the diet
  app.get('/diet', async (request, reply) => {
    const { sessionId } = request.cookies
    console.log({ sessionId })

    const maelsIsDiet = await knex('meals')
      .where('user_session_id', sessionId)
      .where('is_diet', true)
      .count('*', { as: 'count' })

    const [count] = maelsIsDiet
    console.log(count)

    return reply.status(200).send(count)
  })

  // Route of metric related to the meals out the diet
  app.get('/noDiet', async (request, reply) => {
    const { sessionId } = request.cookies
    console.log({ sessionId })

    const maelsIsNotDiet = await knex('meals')
      .where('user_session_id', sessionId)
      .where('is_diet', false)
      .count('*', { as: 'count' })
    const [count] = maelsIsNotDiet
    console.log(count)

    return reply.status(200).send(count)
  })
}
