import { QuestionAttachment } from '../../enterprise/entites/question-attachment'

export interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
}
