/* eslint-disable prettier/prettier */
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '../../enterprise/entites/question';
import { QuestionRepository } from '../repositories/question-repository';

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) { }

  async execute({
    authorId, title, content
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId), // como recebo unique Entity id então tenho que dar um new.
      title,
      content
    })

    // salvando no repository
    await this.questionRepository.create(question)

    return {
      question,
    }
  }
}
