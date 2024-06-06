import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprise/entites/answer-comment'
import { faker } from '@faker-js/faker'

/**
 * @param override Recebe os parâmetros de AnswerProps
 * @generator Partial Faz com que um Objeto tenha suas propriedade opicionais.
 * @returns
 */
export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityID,
) {
  const answerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answerComment
}
