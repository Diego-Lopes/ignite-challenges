import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  // await request(app.server).post('/users').send({
  //   name: 'John Doe',
  //   email: 'johndoe@example1.com',
  //   password: '123456',
  // })

  // criando o usuário direto no prisma, para passarmos a role
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example1.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example1.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
