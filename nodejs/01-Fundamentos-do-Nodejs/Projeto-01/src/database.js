import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

console.log(databasePath.pathname);

export class Database {
  //para privar a variável usa # 
  #database = {}

  constructor() {
    //método construtor que é criado quando é executado.
    /**
     * essa função fs.readFile faz uma leitura do arquivo db.json
     * verificando se existe conteúdo, caso não exista conteúdo ou o arquivo em si
     * no catch ele criar o arquivo db.json vazio.
     */
    fs.readFile(databasePath, 'utf8').then((data) => {
      //se existe algo em data ele atribui na variável privada #database
      this.#database = JSON.parse(data)
    })
    .catch(() => {
      this.#persist()
    })
  }


  #persist() {
    //fs.writeFile recebe arquivo json
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

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

    this.#persist();

    return data //retornar o item que foi inserido.
  }
}