import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

// conexão com banco.
export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
