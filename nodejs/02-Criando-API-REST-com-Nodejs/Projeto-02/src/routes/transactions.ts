import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import crypto from 'node:crypto'

// todo o plugin fastify obrigatoriamente precisa ser assíncrona
// o app está sem tipagem precisamos tipar ele do fastify podemos usar FastifyInstance
export async function transationsRoutes(app: FastifyInstance) {
  // listar tudo
  app.get('/', async () => {
    const transactions = await knex('transactions').select()

    return {
      transactions,
    }
  })

  // buscar detalhes de uma transação única
  app.get('/:id', async (request) => {
    const getTransactionsParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getTransactionsParamsSchema.parse(request.params)
    const transaction = await knex('transactions').where('id', id).first()

    return {
      transaction,
    }
  })

  // obtendo o resumo da conta sobre amount
  app.get('/summary', async () => {
    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' }) // como 2 parametro passamos entre chaves as: 'amount' para renomear
      .first() // usamos first para remover do array, por padrão retorna em um array.

    return {
      summary,
    }
  })

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

    let sessionId = request.cookies.sessionId
    // validação de cookie se não existir, criar
    if (!sessionId) {
      sessionId = crypto.randomUUID()

      // salvando nos cookies
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    // criando nova transação no banco
    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
