/* eslint-disable prettier/prettier */
import { Question } from '../../enterprise/entites/question';
import { QuestionsRepository } from '../repositories/question-repository';

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse {
  // retornando a question editada.
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) { }

  async execute({
    authorId,
    questionId,
    title,
    content
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {

    // pesquisando para verificar se existe a pergunda informada para editar.
    const question = await this.questionRepository.findById(questionId)


    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    question.title = title
    question.content = content

    // editar uma questão
    await this.questionRepository.save(question)

    return {
      question,
    }
  }
}
