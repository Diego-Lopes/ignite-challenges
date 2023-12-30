// não da para acessar process.env.DATABASE_URL se não importar doten/config
import 'dotenv/config'

/**
 * criando variavel de ambiente, isso é baseado nos conhecimento
 * do Diego da Rocketseat, famoso hackerzinho.
 */
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * configurando um ambiente de teste banco de dados isolados, como estamos
 * usando postgress temos uma vantagem, podemos modificar o schema do postgress
 * para fazer ambiente isolados dentro do mesmo banco de dados e não vai compartilhar
 * com os outros schemas.
 */
// postgresql://docker:docker@localhost:5432/apisolid?schema=public

function genarateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

// tipando o defualt usando generic <>
export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()
    const databaseURL = genarateDatabaseURL(schema)

    // sobscrevendo a url do arquivo env
    process.env.DATABASE_URL = databaseURL

    /**
     * logo a substituição executar a migrations
     * execSync execulta comando nível cmd em arquivos js/ts
     * usamos deploy para que abra as pasta migrations e execulte os
     * arquivos já criados.
     * deploy pela etapa de verificação para ve se existe alguma coisa nova.
     */
    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        /**
         * Deletando banco de dados de testes manualmente, como cli do prisma
         * não tem comandos para deletar bancos, vamos fazer manualmente.
         */
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        // no final do teste vamos nos desconectar
        await prisma.$disconnect()
      },
    }
  },
}

/**
 * Usando [npm link] no caminho prisma/vitest-environment-prisma
 * npm faz ligação no package.json do projeto principal para ser reconhecido.
 * Depois no package.json principal usamos o comando npm i vitest-environment-prisma
 */
