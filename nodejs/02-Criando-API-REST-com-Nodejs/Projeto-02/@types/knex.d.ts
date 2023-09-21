/*
 * importando os tipos de knex pois queremos usa-los e adicionar as novas
 * tipagens
 */

// eslint-disable-next-line
import { Knex } from 'knex'

// declarar as tipagens de cada tabela
declare module 'knex/types/tables' {
  export interface Tables {
    transactions: {
      id: string
      title: string
      amount: number
      created_at: string
      session_id?: string
    }
  }
}
