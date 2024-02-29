import { AnswerComment } from '../../enterprise/entites/answer-comment'

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
}
