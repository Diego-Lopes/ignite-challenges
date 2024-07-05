import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { QuestionsRepository } from '../repositories/question-repository'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>
@Injectable()
export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) { }

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    // pesquisando para verificar se existe a pergunda informada.
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    // deletear uma questão
    await this.questionRepository.delete(question)

    return right(null)
  }
}
