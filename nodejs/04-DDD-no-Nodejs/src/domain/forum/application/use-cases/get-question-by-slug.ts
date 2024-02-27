/* eslint-disable prettier/prettier */
import { Question } from '../../enterprise/entites/question';
import { QuestionsRepository } from '../repositories/question-repository';

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionsRepository) { }

  async execute({
    slug
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    /**
     * Como pedoemos retornar nulo devemos fazer uma tratativa de erro.
     */
    if (!question) {
      throw new Error('Question not found.')
    }

    return {
      question,
    }
  }
}
