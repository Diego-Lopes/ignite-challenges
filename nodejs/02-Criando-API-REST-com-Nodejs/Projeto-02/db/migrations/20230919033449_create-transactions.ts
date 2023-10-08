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
    // .decimal() recebe 3 parâmetros 1 o nome da tabela, 2 tamanho que queremos armazenar e 3 casa decimais
    table.decimal('amount', 10, 2).notNullable()
    // passando knex.fn.now() deixamos este campo compatível com todos bancos de dados.
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}
