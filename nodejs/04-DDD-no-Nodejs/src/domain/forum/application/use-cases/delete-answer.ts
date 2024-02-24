/* eslint-disable prettier/prettier */

import { AnswersRepository } from "../repositories/answers-repository"

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface DeleteAnswerUseCaseResponse { }

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) { }

  async execute({
    authorId,
    answerId
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {

    // pesquisando para verificar se existe a pergunda informada.
    const answer = await this.answerRepository.findById(answerId)


    if (!answer) {
      return new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    // deletear uma questão
    await this.answerRepository.delete(answer)

    return {}
  }
}
