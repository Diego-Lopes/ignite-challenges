/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryQuestionsRepository } from 'test/repository/in-memory-question-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entites/question'
import { Slug } from '../../enterprise/entites/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

// automatizando a criação
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {

  beforeEach(() => {
    // instanciando repositorio.
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  /**
   * SUT
   * Significa System Under Test
   */

  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityID(),
      title: 'test title',
      slug: Slug.create('test-title'),
      content: 'test dos testes'
    })

    inMemoryQuestionRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'test-title'
    })

    // toBeTruthy quer dizer que o objeto não pode ser null ou underfined
    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})


