import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entites/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  // uma variável que vai armazenar um array de perguntas
  public items: Question[] = []

  async findById(id: string) {
    /**
     * Não conseguimos compara com UniqueEntityID,
     * então vamos usar toString() que criamos na automação de id.
     */
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async create(question: Question) {
    // simulando como estivessemos inserindo em uma tabela.
    this.items.push(question)
  }

  async delete(question: Question) {
    // varias formas de deletar, vamos usar o index para remover do array.
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    // removendo com splice
    this.items.splice(itemIndex, 1)
  }
}
