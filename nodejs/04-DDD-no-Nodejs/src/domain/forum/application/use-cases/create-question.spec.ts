/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repository/in-memory-question-repository'

// automatizando a criação
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {

  beforeEach(() => {
    // instanciando repositorio.
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  /**
   * SUT
   * Significa System Under Test
   */

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta.',
      attachmentsIds: ['1', '2']
    })

    // toBeTruthy quer dizer que o objeto não pode ser null ou underfined
    // expect(question.id).toBeTruthy()
    // expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id)

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question)
    // testando attachments

    // testando se no array há dois elementos
    expect(inMemoryQuestionRepository.items[0].attachments).toHaveLength(2)

    // testando se no array de elementos existe os ids inseridos no teste.
    expect(inMemoryQuestionRepository.items[0].attachments).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') })
    ])


  })
})


