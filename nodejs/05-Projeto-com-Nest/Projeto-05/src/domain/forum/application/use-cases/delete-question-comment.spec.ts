/* eslint-disable @typescript-eslint/no-unused-vars */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repository/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'

// automatizando a criação
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment', () => {
  beforeEach(() => {
    // instanciando repositorio.
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  /**
   * SUT
   * Significa System Under Test
   */

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment()

    // salvando question e answer em memoria.
    await inMemoryQuestionCommentsRepository.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user question comment', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID('author-1'),
    })

    // salvando question e answer em memoria.
    await inMemoryQuestionCommentsRepository.create(questionComment)

    // expect(() => {
    //   return sut.execute({
    //     questionCommentId: questionComment.id.toString(),
    //     authorId: 'author-2',
    //   })
    // }).rejects.toBeInstanceOf(Error)

    const result = await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
