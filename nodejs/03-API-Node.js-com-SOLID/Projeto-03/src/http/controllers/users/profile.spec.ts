/* eslint-disable @typescript-eslint/no-empty-function */
// testando o hackerzinho de variável ambiente

// vamos utilizar a lib supertest para fazer requisições http sem está hospedado.
import request from 'supertest'

import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticat-user'

// eslint-disable-next-line prettier/prettier
describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // vamos escutar um evento, para saber se nosso servidor foi inicializado
  })

  afterAll(async () => {
    await app.close() // vamos escutar e aguardar a aplicação fechar.
  })

  it('should be able to get user profile', async () => {
    // fazendo authenticate e desestruturando o obj e pegando o token
    const { token } = await createAndAuthenticateUser(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'johndoe@example1.com',
      }),
    )
  })
})

/**
 * Quanto os teste da pasta http forem executado usem o
 * ambiente que está na pasta prisma.
 */
