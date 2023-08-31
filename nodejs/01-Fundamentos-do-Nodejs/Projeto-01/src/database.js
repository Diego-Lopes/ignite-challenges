

export class Database {
  //para privar a variável usa # 
  #database = {}

  //método select para fazer seleção
  /**
   * 
   * @param {*} table
   * escreva o nome da tabela ex.: 'users'
   * @returns 
   */
  select(table) {
    const data = this.#database[table] ?? [] //verifica na database se existe table se não retorna array vazio.

    return data
  }

  //método insert para fazer inserção
  /**
   * 
   * @param {*} table
   * cria a table, dee o nome a ela, ex.: users 
   * @param {*}  data
   * recebe os dados para a table. 
   * @returns 
   */
  insert(table, data) {
    //fazer verificação exite alguma coisa na tabela.
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    return data //retornar o item que foi inserido.
  }
}