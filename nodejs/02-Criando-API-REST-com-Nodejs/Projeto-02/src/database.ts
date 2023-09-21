import 'dotenv/config' // atomaticamente vai ler o arquivo .env
import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: 'sqlite', // obrigatório
  connection: {
    // obrigatório
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true, // faz inserção nos campos das tabelas conteúdo nulos por padrão
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
