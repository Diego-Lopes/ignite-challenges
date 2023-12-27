/* eslint-disable @typescript-eslint/no-empty-function */
// testando o hackerzinho de variável ambiente

// vamos utilizar a lib supertest para fazer requisições http sem está hospedado.
import request from 'supertest'

import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

// eslint-disable-next-line prettier/prettier
describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // vamos escutar um evento, para saber se nosso servidor foi inicializado
  })

  afterAll(async () => {
    await app.close() // vamos escutar e aguardar a aplicação fechar.
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example1.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example1.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})

/**
 * Quanto os teste da pasta http forem executado usem o
 * ambiente que está na pasta prisma.
 */
