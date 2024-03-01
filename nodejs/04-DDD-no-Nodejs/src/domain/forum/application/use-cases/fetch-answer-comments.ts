/**
 * Nessa aula diego usa fetch para lista aglomerado de informação.
 * também podemos usar list, para esse caso.
 * e quanto get ele usa para quando é retorno único.
 */

/* eslint-disable prettier/prettier */
import { AnswerComment } from '../../enterprise/entites/answer-comment';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) { }

  async execute({
    answerId,
    page
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })


    return {
      answerComments,
    }
  }
}
