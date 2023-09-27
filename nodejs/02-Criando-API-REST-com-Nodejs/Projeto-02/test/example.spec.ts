// fazendo o 1 teste

import { test, beforeAll, afterAll, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

// criando categoria
describe('Transactions routes', () => {
  beforeAll(async () => {
    // executar antes de tudo
    await app.ready()
    // ready vai aguardar todas as promisse sejam resolvidas
  })

  afterAll(async () => {
    // depois de tudo
    await app.close()
    // close descarta a aplicação de teste.
  })

  /**
   * pode usar test ou it
   * it é para deixa semântico com a frase.
   * it('should be able to ...', () => {})
   * significa: deve ser possível fazer...
   */

  it('should be able to create a new transactions', async () => {
    // fazer a chamada http para criar uma nova transação
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {

  })
})
