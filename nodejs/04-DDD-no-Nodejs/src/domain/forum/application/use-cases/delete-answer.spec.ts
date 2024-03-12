/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryAnswersRepository } from 'test/repository/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answers'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

// automatizando a criação
let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {

  beforeEach(() => {
    // instanciando repositorio.
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
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
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'))

    inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1'
    })

    /**
     * como nosso função não devolve nada, devemos ir lá no items array 
     * e vericar se foi deletado com sucesso.
     */
    expect(inMemoryAnswerRepository.items).toHaveLength(0)

  })
  it('should not be able to delete a answer from another user', async () => {

    /**
     * Deixamos gerar os valores automáticamente na criação e, 
     * só no segundo parâmetro que passamos um id 
     * para fazer o teste.
     */
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('answer-1'))

    inMemoryAnswerRepository.create(newAnswer)

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
      authorId: 'author-2'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)

  })
})


