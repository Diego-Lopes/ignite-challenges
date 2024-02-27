/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryAnswersRepository } from 'test/repository/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answers'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from 'test/repository/in-memory-question-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeQuestion } from 'test/factories/make-questions'

// automatizando a criação
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Questin Best Answer', () => {

  beforeEach(() => {
    // instanciando repositorio.
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository()

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionRepository,
      inMemoryAnswerRepository
    )
  })

  /**
   * SUT
   * Significa System Under Test
   */

  it('should be able to choose the question best answer', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id
    })

    // salvando question e answer em memoria.
    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)


    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString()
    })

    /**
     * Feito isso, esperamos que no repositório
     * esteja único item com best id answer programado.
     */
    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id)

  })
  it('should not be able to choose another user question best answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    })

    const answer = makeAnswer({
      questionId: question.id
    })

    // salvando question e answer em memoria.
    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)


    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString()
    })


    expect(() => {
      return sut.execute({
        answerId: answer.id.toString(),
        authorId: 'author-2'
      })
    }).rejects.toBeInstanceOf(Error)

  })
})


