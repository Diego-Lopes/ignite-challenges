import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  // esse método cria a tabela.
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    /**
     * table é a tabela uuid tipo de id incremental
     * no .uuid() passamos como parametro o nome da tabela que é 'id'
     * .primary() é para dizer que uma chave primaria.
     */
    table.text('title').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}
