import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import crypto from 'node:crypto'

// todo o plugin fastify obrigatoriamente precisa ser assíncrona
// o app está sem tipagem precisamos tipar ele do fastify podemos usar FastifyInstance
export async function transationsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    // schema de validação
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    /**
     * createTransactionBodySchema.parse(request.body)
     * parse ele faz a validação com schema criado acima e se tudo estiver
     * certo ele continua o processo, caso contrario bloqueia e manda um erro.
     */

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    // criando nova transação
    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return reply.status(201).send()
  })
}
