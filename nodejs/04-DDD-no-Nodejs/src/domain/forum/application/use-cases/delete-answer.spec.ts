/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryAnswersRepository } from 'test/repository/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answers'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryAnswerAttachmentsRepository } from 'test/repository/in-memory-answer-attachments-repository'
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment'

// automatizando a criação
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    // instanciando repositorio.
    inMemoryAnswerRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  /**
   * SUT
   * Significa System Under Test
   */

  it('should be able to delete a answer', async () => {
    /**
     * Deixamos gerar os valores automáticamente na criação e,
     * só no segundo parâmetro que passamos um id
     * para fazer o teste.
     */
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })

    /**
     * como nosso função não devolve nada, devemos ir lá no items array
     * e vericar se foi deletado com sucesso.
     */
    expect(inMemoryAnswerRepository.items).toHaveLength(0)
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0)
  })
  it('should not be able to delete a answer from another user', async () => {
    /**
     * Deixamos gerar os valores automáticamente na criação e,
     * só no segundo parâmetro que passamos um id
     * para fazer o teste.
     */
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswerRepository.create(newAnswer)

    /**
     * Esperado é rejeitar o comando de deletar quando o authorId
     * não é igual da questão a ser deletada.
     */
    // expect(() => {
    //   return sut.execute({
    //     answerId: 'answer-1',
    //     authorId: 'author-2'
    //   })
    // }).rejects.toBeInstanceOf(Error)

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
