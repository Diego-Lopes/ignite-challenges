import { Question } from '../../enterprise/entites/question'

export interface QuestionRepository {
  create(question: Question): Promise<void>
}
