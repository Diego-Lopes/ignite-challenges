import { QuestionComment } from '../../enterprise/entites/question-comment'

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
}
