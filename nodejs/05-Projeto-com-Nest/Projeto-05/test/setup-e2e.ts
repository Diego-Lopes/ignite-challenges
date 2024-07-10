// isso é do vitest não do nestjs
import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

/**
 * Isso faz sobre escrever a variável de ambiente de prod para test
 * no nest ainda isso não está nativo, então temos que implementar na mão mesmo.
 * Futuras versões do nest terá isso nativo.
 *
 * chamando a outra env ele faz a comparação se estiver o nome na
 * segunda chamada ele faz um override do primeiro.
 */
config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

const prisma = new PrismaClient()

function generateUniqueDatabaseURL(schemaId: string) {
  // fazendo uma verificação para verificar se está setado o url do banco de dados
  // para podermos trocar o schema do bando.
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable')
  }

  const url = new URL(process.env.DATABASE_URL)

  // SETANDO O SCHEMA DO BANCO DE DADOS QUE VEM DO PARÂMETRO DA FUNÇÃO.
  url.searchParams.set('schema', schemaId)

  return url.toString()
}
const schemaId = randomUUID()
// Roda antes dos testes
beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId)

  // feita a alteração databaseURL vamos sobrescrever no environment
  process.env.DATABASE_URL = databaseURL

  // comando para executar no terminal
  // deploy ele não le as migration do projeto e sim o que já está no banco.
  execSync('npx prisma migrate deploy')

  // console.log(databaseURL)
})

// Roda depois dos testes
afterAll(async () => {
  // após o teste precisamo deletar o schema criado.
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
  // console.log('depois')
})
