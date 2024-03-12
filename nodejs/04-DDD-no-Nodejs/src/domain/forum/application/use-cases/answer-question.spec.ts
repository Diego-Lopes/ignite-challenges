/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryAnswersRepository } from 'test/repository/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

// automatizando a criação
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {

  beforeEach(() => {
    // instanciando repositorio.
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  /**
   * SUT
   * Significa System Under Test
   */

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteúdo da resposta.'
    })

    // toBeTruthy quer dizer que o objeto não pode ser null ou underfined
    // expect(answer.id).toBeTruthy()
    // expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)

    // Usando Functional error handling, ao invés de chamar a propriedade 
    // validamos com right ou left
    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)

  })
})


