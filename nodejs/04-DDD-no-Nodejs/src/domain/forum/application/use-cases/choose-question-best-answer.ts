/* eslint-disable prettier/prettier */
import { AnswersRepository } from '../repositories/answers-repository'
import { Question } from '../../enterprise/entites/question'
import { QuestionsRepository } from '../repositories/question-repository'

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}


export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository
  ) { }

  async execute({
    answerId,
    authorId
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    // procurando a resposta.
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString()
    )

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    // caso passe nas verificações, executamos a melhor reposta.
    question.bestAnswerId = answer.id

    // salvando no repositório a pergunta.
    await this.questionsRepository.save(question)

    // no final vai retorna a question modificada.
    return {
      question
    }

  }
}
