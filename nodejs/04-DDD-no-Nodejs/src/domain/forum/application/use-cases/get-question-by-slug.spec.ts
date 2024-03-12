/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryQuestionsRepository } from 'test/repository/in-memory-question-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-questions'
import { Slug } from '../../enterprise/entites/value-objects/slug'

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
    const newQuestion = makeQuestion({
      slug: Slug.create('test-title')
    })

    await inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'test-title'
    })

    // toBeTruthy quer dizer que o objeto não pode ser null ou underfined
    // expect(result.value?.question.id).toBeTruthy()
    // expect(result.value?.question.title).toEqual(newQuestion.title)
    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.question.title).toEqual(newQuestion.title)
    }
  })
})


