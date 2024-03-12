/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryQuestionsRepository } from "test/repository/in-memory-question-repository"
import { EditQuestionUseCase } from "./edit-question"
import { makeQuestion } from "test/factories/make-questions"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { NotAllowedError } from "./errors/not-allowed-error"

// automatizando a criação
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {

  beforeEach(() => {
    // instanciando repositorio.
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)
  })

  /**
   * SUT
   * Significa System Under Test
   */

  it('should be able to edit a question', async () => {

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
      questionId: newQuestion.id.toValue(),
      authorId: 'author-1',
      title: 'Pergunta-test 1',
      content: 'Conteúdo test 1'
    })

    /**
     * como nosso função não devolve nada, devemos ir lá no items array 
     * e vericar se foi deletado com sucesso.
     */
    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'Pergunta-test 1',
      content: 'Conteúdo test 1'
    })

  })
  it('should not be able to edit a question from another user', async () => {

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
    // expect(() => {
    //   return sut.execute({
    //     questionId: newQuestion.id.toValue(),
    //     authorId: 'author-2',
    //     title: 'Pergunta-test 1',
    //     content: 'Conteúdo test 1'
    //   })
    // }).rejects.toBeInstanceOf(Error)

    const result = await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-2',
      title: 'Pergunta-test 1',
      content: 'Conteúdo test 1'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)

  })
})


