import { FastifyInstance } from 'fastify'
import { knex } from '../database'

// todo o plugin fastify obrigatoriamente precisa ser assíncrona
// o app está sem tipagem precisamos tipar ele do fastify podemos usar FastifyInstance
export async function transationsRoutes(app: FastifyInstance) {
  app.get('/hello', async () => {
    // const transaction = knex('transactions')
    //   .insert({
    //     id: crypto.randomUUID(),
    //     title: 'Transação de teste',
    //     amount: 1000,
    //   })
    //   .returning('*')

    // return transaction

    // traz todas as transações do banco de dados
    const transactions = await knex('transactions').select('*')
    return transactions
  })
}
