import { knex as setupKnex } from 'knex'

export const config = {
  client: 'sqlite', // obrigatório
  connection: {
    // obrigatório
    filename: './tmp/app.db',
  },
  useNullAsDefault: true, // faz inserção nos campos das tabelas conteúno nulos por padrão
}

export const knex = setupKnex(config)
