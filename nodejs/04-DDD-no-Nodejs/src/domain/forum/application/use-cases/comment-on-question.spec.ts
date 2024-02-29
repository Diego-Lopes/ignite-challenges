/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeAnswer } from 'test/factories/make-answers'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from 'test/repository/in-memory-question-repository'
import { makeQuestion } from 'test/factories/make-questions'
import { InMemoryQuestionCommentsRepository } from 'test/repository/in-memory-question-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

// automatizando a criação
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {

  beforeEach(() => {
    // instanciando repositorio.
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentsRepository
    )
  })

  /**
   * SUT
   * Significa System Under Test
   */

  it('should be able to comment on question', async () => {
    const question = makeQuestion()


    // salvando question e answer em memoria.
    await inMemoryQuestionRepository.create(question)



    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Olha o teeeeeeste.'
    })

    /**
     * Feito isso, esperamos que no repositório
     * esteja único item com best id answer programado.
     */
    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual('Olha o teeeeeeste.')

  })
})


