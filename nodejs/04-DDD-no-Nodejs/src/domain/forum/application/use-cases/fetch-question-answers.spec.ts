/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryAnswersRepository } from 'test/repository/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answers'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

// automatizando a criação
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Questions Answers', () => {

  beforeEach(() => {
    // instanciando repositorio.
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  /**
   * SUT
   * Significa System Under Test
   */

  it('should be able to fetch questions answers', async () => {
    await inMemoryAnswersRepository.create(makeAnswer(
      { questionId: new UniqueEntityID('question-1') }
    ))
    await inMemoryAnswersRepository.create(makeAnswer(
      { questionId: new UniqueEntityID('question-1') }
    ))
    await inMemoryAnswersRepository.create(makeAnswer(
      { questionId: new UniqueEntityID('question-1') }
    ))

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1
    })

    // eu espero que tenha um array com 3 itens
    expect(answers).toHaveLength(3)

  })

  it('should be able to fetch paginated questions answers', async () => {

    // validando paginação
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(makeAnswer(
        { questionId: new UniqueEntityID('question-1') }
      ))
    }

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 2
    })

    // espero que na pagina 2, apenas 2 itens
    expect(answers).toHaveLength(2)

  })
})