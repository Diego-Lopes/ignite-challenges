/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
    })

    // toBeTruthy quer dizer que o objeto não pode ser null ou underfined
    // expect(question.id).toBeTruthy()
    // expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id)

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question)


  })
})


