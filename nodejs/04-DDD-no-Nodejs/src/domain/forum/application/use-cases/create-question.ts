/* eslint-disable prettier/prettier */
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '../../enterprise/entites/question';
import { QuestionsRepository } from '../repositories/question-repository';
import { Either, right } from '@/core/either';

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

type CreateQuestionUseCaseResponse = Either<null, {
  question: Question
}>

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) { }

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

    return right({
      question,
    })
  }
}
