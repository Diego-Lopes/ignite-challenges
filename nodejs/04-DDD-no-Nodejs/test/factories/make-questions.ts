import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entites/question'
import { Slug } from '@/domain/forum/enterprise/entites/value-objects/slug'
/**
 * @param override Recebe os parâmetros de QuestionProps
 * @generator Partial Faz com que um Objeto tenha suas propriedade opicionais.
 * @returns
 */
export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: 'Hora do Show',
    slug: Slug.create('hora-do-show'),
    content: 'Sou eu... Tiririca...',
    ...override,
  })

  return question
}
