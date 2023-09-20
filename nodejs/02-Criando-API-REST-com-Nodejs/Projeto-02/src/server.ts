import fastify from 'fastify'
import { knex } from './database'
import crypto from 'node:crypto'

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
  .listen({ port: 3333 })
  .then(() => console.log('HTTP Server listening on port 3333'))
