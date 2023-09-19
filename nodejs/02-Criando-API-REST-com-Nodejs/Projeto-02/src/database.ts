import { knex as setupKnex, Knex } from 'knex'

export const config: Knex.Config = {
  client: 'sqlite', // obrigatório
  connection: {
    // obrigatório
    filename: './db/app.db',
  },
  useNullAsDefault: true, // faz inserção nos campos das tabelas conteúdo nulos por padrão
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
