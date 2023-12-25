/* eslint-disable @typescript-eslint/no-empty-function */

// vamos utilizar a lib supertest para fazer requisições http sem está hospedado.
import request from 'supertest'

import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticat-user'
import { prisma } from '@/lib/prisma'

// eslint-disable-next-line prettier/prettier
describe('Validate check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // vamos escutar um evento, para saber se nosso servidor foi inicializado
  })

  afterAll(async () => {
    await app.close() // vamos escutar e aguardar a aplicação fechar.
  })

  it('should be able to validate a check-in', async () => {
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

    const user = await prisma.user.findFirstOrThrow()

    /**
     * fazendo check-in
     */
    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })
    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    /**
     * posso fazer uma nova busca no banco de dados,
     * para verificar o campo validated_at
     */
    checkIn = await prisma.checkIn.findFirstOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
