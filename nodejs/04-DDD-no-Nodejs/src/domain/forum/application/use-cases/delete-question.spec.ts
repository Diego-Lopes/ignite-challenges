/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryQuestionsRepository } from "test/repository/in-memory-question-repository"
import { DeleteQuestionUseCase } from "./delete-question"
import { makeQuestion } from "test/factories/make-questions"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

// automatizando a criação
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {

  beforeEach(() => {
    // instanciando repositorio.
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)
  })

  /**
   * SUT
   * Significa System Under Test
   */

  it('should be able to delete a question', async () => {

    /**
     * Deixamos gerar os valores automáticamente na criação e, 
     * só no segundo parâmetro que passamos um id 
     * para fazer o teste.
     */
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))

    inMemoryQuestionRepository.create(newQuestion)

    await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1'
    })

    /**
     * como nosso função não devolve nada, devemos ir lá no items array 
     * e vericar se foi deletado com sucesso.
     */
    expect(inMemoryQuestionRepository.items).toHaveLength(0)

  })
  it('should not be able to delete a question from another user', async () => {

    /**
     * Deixamos gerar os valores automáticamente na criação e, 
     * só no segundo parâmetro que passamos um id 
     * para fazer o teste.
     */
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))

    inMemoryQuestionRepository.create(newQuestion)

    /**
     * Esperado é rejeitar o comando de deletar quando o authorId
     * não é igual da questão a ser deletada.
     */
    expect(() => {
      return sut.execute({
        questionId: 'question-1',
        authorId: 'author-2'
      })
    }).rejects.toBeInstanceOf(Error)

  })
})


