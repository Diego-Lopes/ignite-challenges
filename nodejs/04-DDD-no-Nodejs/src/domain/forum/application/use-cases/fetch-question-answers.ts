/**
 * Nessa aula diego usa fetch para lista aglomerado de informação.
 * também podemos usar list, para esse caso.
 * e quanto get ele usa para quando é retorno único.
 */

/* eslint-disable prettier/prettier */
import { Answer } from '../../enterprise/entites/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) { }

  async execute({
    questionId,
    page
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page })


    return {
      answers,
    }
  }
}
