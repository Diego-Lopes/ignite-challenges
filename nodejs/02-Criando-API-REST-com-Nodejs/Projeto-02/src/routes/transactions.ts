import { FastifyInstance } from 'fastify'
import crypto from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

// todo o plugin fastify obrigatoriamente precisa ser assíncrona
// o app está sem tipagem precisamos tipar ele do fastify podemos usar FastifyInstance
export async function transationsRoutes(app: FastifyInstance) {
  /**
   * aplicando middlewares globais
   */
  app.addHook('preHandler', async (request, reply) => {
    console.log(`[${request.method}] ${request.url}`)
  })

  // listar tudo
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists], // preHandler é executar antes do  handler
    },
    async (request, reply) => {
      const { sessionId } = request.cookies
      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

      return {
        transactions,
      }
    },
  )

  // buscar detalhes de uma transação única
  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getTransactionsParamsSchema = z.object({
        id: z.string().uuid(),
      })
      const { sessionId } = request.cookies

      const { id } = getTransactionsParamsSchema.parse(request.params)
      const transaction = await knex('transactions')
        .where({ session_id: sessionId, id })
        .first()

      return {
        transaction,
      }
    },
  )

  // obtendo o resumo da conta sobre amount
  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' }) // como 2 parametro passamos entre chaves as: 'amount' para renomear
        .first() // usamos first para remover do array, por padrão retorna em um array.

      return {
        summary,
      }
    },
  )

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
        maxAge: 60 * 60 * 24 * 7, // 7 days
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
