/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryAnswersRepository } from "test/repository/in-memory-answers-repository"
import { EditAnswerUseCase } from "./edit-answer"
import { makeAnswer } from "test/factories/make-answers"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

// automatizando a criação
let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {

  beforeEach(() => {
    // instanciando repositorio.
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  /**
   * SUT
   * Significa System Under Test
   */

  it('should be able to edit a answer', async () => {

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
      answerId: newAnswer.id.toValue(),
      authorId: 'author-1',
      content: 'Conteúdo test 1'
    })

    /**
     * como nosso função não devolve nada, devemos ir lá no items array 
     * e vericar se foi deletado com sucesso.
     */
    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'Conteúdo test 1'
    })

  })
  it('should not be able to edit a answer from another user', async () => {

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
    expect(() => {
      return sut.execute({
        answerId: newAnswer.id.toValue(),
        authorId: 'author-2',
        content: 'Conteúdo test 1'
      })
    }).rejects.toBeInstanceOf(Error)

  })
})


