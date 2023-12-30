/* eslint-disable @typescript-eslint/no-empty-function */

// vamos utilizar a lib supertest para fazer requisições http sem está hospedado.
import request from 'supertest'

import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticat-user'
import { prisma } from '@/lib/prisma'

// eslint-disable-next-line prettier/prettier
describe('Check-in history (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // vamos escutar um evento, para saber se nosso servidor foi inicializado
  })

  afterAll(async () => {
    await app.close() // vamos escutar e aguardar a aplicação fechar.
  })

  /**
   * Para eu lista histórico proceiso fazer check-in antes
   */
  it('should be able to list the history of check-ins', async () => {
    // fazendo authenticate e desestruturando o obj e pegando o token
    const { token } = await createAndAuthenticateUser(app)

    /**
     * Podemos chamar o prisma direto nos teste, porém isso não é muito funcional,
     * caso temos uma propriedade obrigatória teremos que ir em casa teste adicionar
     * esse propriedade obrigatoria.
     * por hora será assim mais para frete será melhorado.
     */
    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    /**
     * Vamos fazer check-in manualmente no prisma vamos encontrar o primeiro
     * usuário cadastrado no banco para que possamos pegar o user_id
     */
    const user = await prisma.user.findFirstOrThrow()

    /**
     * Agora vamos fazer o check-in manualmente
     */
    await prisma.checkIn.createMany({
      data: [
        { gym_id: gym.id, user_id: user.id },
        { gym_id: gym.id, user_id: user.id },
      ],
    })

    const response = await request(app.server)
      .get(`/check-ins/history`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id,
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id,
      }),
    ])
  })
})
