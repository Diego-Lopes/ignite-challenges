/* eslint-disable prettier/prettier */
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionsRepository } from '../repositories/question-repository';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';
import { QuestionComment } from '../../enterprise/entites/question-comment';

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository
  ) { }

  async execute({
    authorId, questionId, content
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {

    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    // salvando, criando estrutrura
    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    // salvando o objeto.
    await this.questionCommentsRepository.create(questionComment)

    // Depois de ter salvando retornameno o objeto.
    return {
      questionComment,
    }
  }
}
