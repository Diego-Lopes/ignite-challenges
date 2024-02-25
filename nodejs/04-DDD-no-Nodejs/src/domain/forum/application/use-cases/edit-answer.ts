/* eslint-disable prettier/prettier */

import { Answer } from "../../enterprise/entites/answer"
import { AnswersRepository } from "../repositories/answers-repository"

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) { }

  async execute({
    authorId,
    answerId,
    content
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {

    // pesquisando para verificar se existe a pergunda informada para editar.
    const answer = await this.answerRepository.findById(answerId)


    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    answer.content = content

    // editar uma questão
    await this.answerRepository.save(answer)

    return {
      answer
    }
  }
}
