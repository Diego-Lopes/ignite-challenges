import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.increments('id').primary()
    table.text('name').notNullable()
    table.text('description').notNullable()
    table.boolean('is_diet').defaultTo(false).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    table.text('hours').notNullable()
    table.text('date').notNullable()

    // fazendo referência extrangeira.
    table
      .text('user_session_id')
      .unsigned()
      .references('session_id')
      .inTable('users')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}
