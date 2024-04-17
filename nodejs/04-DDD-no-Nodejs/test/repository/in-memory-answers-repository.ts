import { DomainEvents } from '@/core/event/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entites/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  // uma variável que vai armazenar um array de respostas
  public items: Answer[] = []

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) { }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(answer: Answer) {
    // simulando como estivessemos inserindo em uma tabela.
    this.items.push(answer)

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(answer: Answer) {
    // varias formas de deletar, vamos usar o index para remover do array.
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    // removendo com splice
    this.items.splice(itemIndex, 1)
    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())
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

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }
}
