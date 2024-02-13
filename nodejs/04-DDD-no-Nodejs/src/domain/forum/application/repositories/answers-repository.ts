import { Answer } from '../../enterprise/entites/answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
}
