/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/repository/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

// automatizando a criação
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answers Comments', () => {

  beforeEach(() => {
    // instanciando repositorio.
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  /**
   * SUT
   * Significa System Under Test
   */

  it('should be able to fetch answers comment', async () => {
    await inMemoryAnswerCommentsRepository.create(makeAnswerComment(
      { answerId: new UniqueEntityID('answer-1') }
    ))
    await inMemoryAnswerCommentsRepository.create(makeAnswerComment(
      { answerId: new UniqueEntityID('answer-1') }
    ))
    await inMemoryAnswerCommentsRepository.create(makeAnswerComment(
      { answerId: new UniqueEntityID('answer-1') }
    ))

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 1
    })

    // eu espero que tenha um array com 3 itens
    expect(answerComments).toHaveLength(3)

  })

  it('should be able to fetch paginated answers comment', async () => {

    // validando paginação
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(makeAnswerComment(
        { answerId: new UniqueEntityID('answer-1') }
      ))
    }

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 2
    })

    // espero que na pagina 2, apenas 2 itens
    expect(answerComments).toHaveLength(2)

  })
})