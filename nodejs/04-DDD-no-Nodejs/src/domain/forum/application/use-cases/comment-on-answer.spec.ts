/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryAnswersRepository } from 'test/repository/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answers'
import { InMemoryAnswerCommentsRepository } from 'test/repository/in-memory-answer-comments-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'

// automatizando a criação
let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {

  beforeEach(() => {
    // instanciando repositorio.
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentsRepository
    )
  })

  /**
   * SUT
   * Significa System Under Test
   */

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()


    // salvando answer e answer em memoria.
    await inMemoryAnswerRepository.create(answer)



    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Olha o teeeeeeste.'
    })

    /**
     * Feito isso, esperamos que no repositório
     * esteja único item com best id answer programado.
     */
    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual('Olha o teeeeeeste.')

  })
})


