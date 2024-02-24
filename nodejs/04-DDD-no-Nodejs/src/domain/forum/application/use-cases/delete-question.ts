/* eslint-disable prettier/prettier */
import { QuestionsRepository } from '../repositories/question-repository';

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

interface DeleteQuestionUseCaseResponse { }

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) { }

  async execute({
    authorId,
    questionId
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {

    // pesquisando para verificar se existe a pergunda informada.
    const question = await this.questionRepository.findById(questionId)


    if (!question) {
      return new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    // deletear uma questão
    await this.questionRepository.delete(question)

    return {}
  }
}
