/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryQuestionsRepository } from 'test/repository/in-memory-question-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-questions'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryQuestionAttachmentsRepository } from 'test/repository/in-memory-question-attachments-repository'
import { makeQuestionAttachment } from 'test/factories/make-question-attachments'

// automatizando a criação
let inMemoryQuestionRepository: InMemoryQuestionsRepository
// quando deletar uma pergunda deletar também os anexos.
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    // instanciando repositorio.
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
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
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionRepository.create(newQuestion)

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    // deletando uma pergunta
    await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
    })

    /**
     * como nosso função não devolve nada, devemos ir lá no items array
     * e vericar se foi deletado com sucesso.
     */
    expect(inMemoryQuestionRepository.items).toHaveLength(0)
    // quando deletar não tiver mais nem um item em anexos.
    expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(0)
  })
  it('should not be able to delete a question from another user', async () => {
    /**
     * Deixamos gerar os valores automáticamente na criação e,
     * só no segundo parâmetro que passamos um id
     * para fazer o teste.
     */
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    inMemoryQuestionRepository.create(newQuestion)

    /**
     * Esperado é rejeitar o comando de deletar quando o authorId
     * não é igual da questão a ser deletada.
     */
    // expect(() => {
    //   return sut.execute({
    //     questionId: 'question-1',
    //     authorId: 'author-2'
    //   })
    // }).rejects.toBeInstanceOf(Error)

    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
