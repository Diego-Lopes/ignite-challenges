import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/forum/enterprise/entites/question-comment'
import { faker } from '@faker-js/faker'

/**
 * @param override Recebe os parâmetros de QuestionProps
 * @generator Partial Faz com que um Objeto tenha suas propriedade opicionais.
 * @returns
 */
export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityID,
) {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return questionComment
}
