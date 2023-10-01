// fazendo o 1 teste

import { beforeAll, afterAll, describe, it, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'
import { afterEach } from 'node:test'

// criando categoria
describe('Transactions routes', () => {
  // beforeAll prepara o ambiente antes dos testes.
  beforeAll(async () => {
    // executar antes de tudo uma unica vez.
    await app.ready()
    // ready vai aguardar todas as promisse sejam resolvidas
  })

  // afterAll é executado depois de todos os testes.
  afterAll(async () => {
    // depois de tudo
    await app.close()
    // close descarta a aplicação de teste.
  })

  // beforeEach rodando script paralelos antes de cada teste em um bloco de teste.
  beforeEach(() => {
    // execSync executa comando de terminal de dentro da aplicação
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  // afterEach executa depois de cada teste em um bloco de teste
  // afterEach(() => { })

  /**
   * pode usar test ou it
   * it é para deixa semântico com a frase.
   * it('should be able to ...', () => {})
   * significa: deve ser possível fazer...
   */

  it('should be able to create a new transactions', async () => {
    // fazer a chamada http para criar uma nova transação
    const response = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
      .expect(201)
    console.log(response.get('Set-Cookie'))
  })

  // listar todas as transações
  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies) // set('Cookie', cookies) vem do jest
      .expect(200) // expectiva que dê 200

    // validando o body
    expect(listTransactionResponse.body.transactions).toEqual([
      expect.objectContaining({
        // espero um objeto contento esse valores
        title: 'New transaction',
        amount: 5000,
      }),
    ])
  })
  // listando transação específica.
  it('should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
    // cookie para identificar o usuário.
    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies) // set('Cookie', cookies) vem do jest
      .expect(200) // expectiva que dê 200

    // pegando o id da transaction
    const transactionId = listTransactionResponse.body.transactions[0].id

    //
    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

    // validando o body
    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        // espero um objeto contento esse valores
        title: 'New transaction',
        amount: 5000,
      }),
    )
  })

  // buscando resumo.
  it('should be able to get the summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })
    const cookies = createTransactionResponse.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Debit transaction',
        amount: 2000,
        type: 'debit',
      })

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies) // set('Cookie', cookies) vem do jest
      .expect(200) // expectiva que dê 200

    // validando o body
    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    })
  })
})
