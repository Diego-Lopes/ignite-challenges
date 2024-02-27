/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryQuestionsRepository } from 'test/repository/in-memory-question-repository'
import { makeQuestion } from 'test/factories/make-questions'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

// automatizando a criação
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {

  beforeEach(() => {
    // instanciando repositorio.
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository)
  })

  /**
   * SUT
   * Significa System Under Test
   */

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionRepository.create(makeQuestion({
      createdAt: new Date(2022, 0, 20)
    }))
    await inMemoryQuestionRepository.create(makeQuestion({
      createdAt: new Date(2022, 0, 18)
    }))
    await inMemoryQuestionRepository.create(makeQuestion({
      createdAt: new Date(2022, 0, 23)
    }))

    const { questions } = await sut.execute({
      page: 1
    })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])

  })

  it('should be able to fetch paginated recent questions', async () => {

    // validando paginação
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({
      page: 2
    })

    // expero que na pagina 2 tenha pelo menos 2 itens
    expect(questions).toHaveLength(2)

  })
})


