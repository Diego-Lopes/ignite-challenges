import fastify from 'fastify'
import { knex } from './database'
import crypto from 'node:crypto'
import { env } from './env'

const app = fastify()

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

app
  .listen({ port: env.PORT })
  .then(() => console.log(`HTTP Server listening on port ${env.PORT}`))
