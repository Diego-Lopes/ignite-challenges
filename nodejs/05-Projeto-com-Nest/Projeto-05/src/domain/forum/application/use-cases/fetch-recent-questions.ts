/**
 * Nessa aula diego usa fetch para lista aglomerado de informação.
 * também podemos usar list, para esse caso.
 * e quanto get ele usa para quando é retorno único.
 */

import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/question-repository'

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>
@Injectable()
export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) { }

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    return right({
      questions,
    })
  }
}
