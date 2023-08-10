import { prisma } from '@/lib/prisma'
import { setCookie } from 'nookies'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { name, username } = req.body

  // verificar no banco se já existe o usuário
  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  // se retornar algo do banco, retorne um code error
  if (userExists) {
    return res.status(400).json({
      message: 'Username already exists.',
    })
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  // armazenando dados no cookie
  setCookie({ res }, '@ignitecall:userID', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: '/',
  })

  return res.status(201).json(user)
}
