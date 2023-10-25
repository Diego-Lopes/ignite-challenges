import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'

export async function CreateMeals(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    console.log(`[${request.method}] ${request.url}`)
  })

  // post create meal
  app.post('/', async (request, reply) => {
    // schema de validação
    const createFoodBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      isDiet: z.boolean(),
      date: z.string(),
      hours: z.string(),
    })

    const { name, description, isDiet, date, hours } =
      createFoodBodySchema.parse(request.body)
    const sessionId = String(request.cookies.sessionId)
    console.log({ name, description, isDiet, date, hours })
    console.log(sessionId)

    // salvando no banco de dados

    const insertedRecord = await knex('meals').returning('id').insert({
      name,
      description,
      is_diet: isDiet,
      user_session_id: sessionId,
      hours,
      date,
    })

    return reply.status(201).send(insertedRecord[0])
  })

  // List all meals
  app.get('/', async (request, reply) => {
    const { sessionId } = request.cookies

    const meals = await knex('meals')
      .where('user_session_id', sessionId)
      .select()

    return { meals }
  })

  // List one
  app.get('/:id', async (request, reply) => {
    console.log(request.cookies)

    const idParamsOneMealSchema = z.object({
      id: z.string(),
    })

    const { id } = idParamsOneMealSchema.parse(request.params)
    console.log(id)

    const meal = await knex('meals')
      .where('user_session_id', request.cookies.sessionId)
      .where('id', id)
      .select()

    return meal
  })

  interface updateDataProps {
    name?: string
    description?: string
    date?: string
    hours?: string
    is_diet?: boolean
    modification_at?: string
  }

  // alterar uma refeição
  app.patch('/:id', async (request, reply) => {
    const patchFoodBodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      isDiet: z.boolean().optional(),
      date: z.string().optional(),
      hours: z.string().optional(),
    })

    const idParamsSchema = z.object({
      id: z.string(),
    })

    const { description, isDiet, name, date, hours } =
      patchFoodBodySchema.parse(request.body)
    const { id } = idParamsSchema.parse(request.params)

    console.log({ description, isDiet, name, id, date, hours })

    const updateData: updateDataProps = {
      modification_at: String(new Date(Date.now())),
    }

    if (name !== '' || name !== undefined) {
      updateData.name = name
    }

    if (description !== '' || description !== undefined) {
      updateData.description = description
    }

    if (isDiet !== undefined) {
      updateData.is_diet = isDiet
    }

    if (date !== '' || date !== undefined) {
      updateData.date = date
    }

    if (hours !== '' || hours !== undefined) {
      updateData.hours = hours
    }

    console.log({ updateData })

    const clearUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([key, value]) => value !== undefined),
    )

    console.log(clearUpdateData)

    await knex('meals').where('id', id).update(clearUpdateData)

    return reply.status(204).send()
  })

  // deletar uma refeição
  app.delete('/:id', async (request, reply) => {
    const idParamsSchema = z.object({
      id: z.string(),
    })

    const { id } = idParamsSchema.parse(request.params)

    console.log(id)

    await knex('meals').where('id', id).delete()

    return reply.status(204)
  })

  // Routes of metrics related to the meals
  app.get('/metrics/meals', async (request, reply) => {
    const { sessionId } = request.cookies

    console.log({ sessionId })
  })
}
