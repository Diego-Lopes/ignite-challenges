import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entites/question'
import { faker } from '@faker-js/faker'

/**
 * @param override Recebe os parâmetros de QuestionProps
 * @generator Partial Faz com que um Objeto tenha suas propriedade opicionais.
 * @returns
 */
export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}
