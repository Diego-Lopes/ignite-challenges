/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * importando os tipos de knex pois queremos usa-los e adicionar as novas
 * tipagens
 */

import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: number
      name: string
      email: string
      password: string
      session_id: string
      created_at?: string
    }
    meals: {
      id: number
      name: string
      description: string
      is_diet: boolean
      hours: string
      date: string
      created_at?: string
      modification_at?: string
      user_session_id: string
    }
  }
}
