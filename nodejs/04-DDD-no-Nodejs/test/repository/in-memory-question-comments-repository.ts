/* eslint-disable prettier/prettier */
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entites/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository {
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }
}
