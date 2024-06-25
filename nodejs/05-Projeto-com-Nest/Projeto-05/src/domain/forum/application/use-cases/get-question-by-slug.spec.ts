/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeQuestion } from 'test/factories/make-questions'
import { InMemoryQuestionAttachmentsRepository } from 'test/repository/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repository/in-memory-question-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

// automatizando a criação
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    // instanciando repositorio.
    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  /**
   * SUT
   * Significa System Under Test
   */

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('test-title'),
    })

    await inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'test-title',
    })

    // toBeTruthy quer dizer que o objeto não pode ser null ou underfined
    // expect(result.value?.question.id).toBeTruthy()
    // expect(result.value?.question.title).toEqual(newQuestion.title)
    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.question.title).toEqual(newQuestion.title)
    }

    // testando entrano na estrutura do objeto
    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        id: newQuestion.id,
        title: newQuestion.title,
      }),
    })
  })
})
