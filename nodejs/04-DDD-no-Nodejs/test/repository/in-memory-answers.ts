import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entites/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  // uma variável que vai armazenar um array de respostas
  public items: Answer[] = []

  async create(answer: Answer) {
    // simulando como estivessemos inserindo em uma tabela.
    this.items.push(answer)
  }
}
