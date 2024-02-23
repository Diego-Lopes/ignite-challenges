import { Question } from '../../enterprise/entites/question'

export interface QuestionRepository {
  findById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  delete(question: Question): Promise<void>
  create(question: Question): Promise<void>
}
