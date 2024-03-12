/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/repository/in-memory-question-comments-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from 'test/factories/make-question-comment'

// automatizando a criação
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Questions Comments', () => {

  beforeEach(() => {
    // instanciando repositorio.
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  /**
   * SUT
   * Significa System Under Test
   */

  it('should be able to fetch questions comment', async () => {
    await inMemoryQuestionCommentsRepository.create(makeQuestionComment(
      { questionId: new UniqueEntityID('question-1') }
    ))
    await inMemoryQuestionCommentsRepository.create(makeQuestionComment(
      { questionId: new UniqueEntityID('question-1') }
    ))
    await inMemoryQuestionCommentsRepository.create(makeQuestionComment(
      { questionId: new UniqueEntityID('question-1') }
    ))

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1
    })

    // eu espero que tenha um array com 3 itens
    expect(result.value?.questionComments).toHaveLength(3)

  })

  it('should be able to fetch paginated questions comment', async () => {

    // validando paginação
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(makeQuestionComment(
        { questionId: new UniqueEntityID('question-1') }
      ))
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2
    })

    // espero que na pagina 2, apenas 2 itens
    expect(result.value?.questionComments).toHaveLength(2)

  })
})