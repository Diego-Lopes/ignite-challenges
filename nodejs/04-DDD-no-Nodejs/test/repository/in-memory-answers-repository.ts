import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entites/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  // uma variável que vai armazenar um array de respostas
  public items: Answer[] = []

  async create(answer: Answer) {
    // simulando como estivessemos inserindo em uma tabela.
    this.items.push(answer)
  }

  async delete(answer: Answer) {
    // varias formas de deletar, vamos usar o index para remover do array.
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    // removendo com splice
    this.items.splice(itemIndex, 1)
  }

  async findById(id: string) {
    /**
     * Não conseguimos compara com UniqueEntityID,
     * então vamos usar toString() que criamos na automação de id.
     */
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    // dentro desse indece vou substituir os dados que modificamos.
    this.items[itemIndex] = answer
  }
}
