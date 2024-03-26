import { InMemoryQuestionsRepository } from 'test/repository/in-memory-question-repository'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from 'test/factories/make-questions'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryQuestionAttachmentsRepository } from 'test/repository/in-memory-question-attachments-repository'
import { makeQuestionAttachment } from 'test/factories/make-question-attachments'

// automatizando a criação
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    // instanciando repositorio.
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionAttachmentsRepository,
    )
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
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

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

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-1',
      title: 'Pergunta-test 1',
      content: 'Conteúdo test 1',
      attachmentsIds: ['1', '3'],
    })

    /**
     * como nosso função não devolve nada, devemos ir lá no items array
     * e vericar se foi deletado com sucesso.
     */
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Pergunta-test 1',
      content: 'Conteúdo test 1',
    })
    // testando se no array há dois elementos
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)

    // testando se no array de elementos existe os ids inseridos no teste.
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
    ])
  })

  it('should not be able to edit a question from another user', async () => {
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

    inMemoryQuestionsRepository.create(newQuestion)

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
      content: 'Conteúdo test 1',
      attachmentsIds: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
