/* eslint-disable prettier/prettier */
import { QuestionsRepository } from '../repositories/question-repository';

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse { }

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
      return new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    question.title = title
    question.content = content

    // editar uma questão
    await this.questionRepository.save(question)

    return {}
  }
}
