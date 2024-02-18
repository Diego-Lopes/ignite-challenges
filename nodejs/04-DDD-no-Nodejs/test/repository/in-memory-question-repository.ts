import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entites/question'

export class InMemoryQuestionsRepository implements QuestionRepository {
  // uma variável que vai armazenar um array de perguntas
  public items: Question[] = []

  async create(question: Question) {
    // simulando como estivessemos inserindo em uma tabela.
    this.items.push(question)
  }
}
