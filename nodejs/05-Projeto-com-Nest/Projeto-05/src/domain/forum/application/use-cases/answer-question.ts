/* eslint-disable prettier/prettier */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entites/answer'
import { Either, right } from '@/core/either'
import { AnswerAttachment } from '../../enterprise/entites/answer-attachment'
import { AnswerAttachmentList } from '../../enterprise/entites/answer-attachment-list'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  attachmentsIds: string[]
  content: string
}

// ou eu vou ter uma resposta do tipo nulo ou vou ter do tipo answer
type AnswerQuestionUseCaseResponse = Either<null, {
  answer: Answer
}>


export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) { }

  async execute({
    instructorId,
    questionId,
    content,
    attachmentsIds,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answersRepository.create(answer)

    return right({
      answer
    })
  }
}
