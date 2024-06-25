/**
 * Polimorfismo
 * uma entidade que tem mais de um função
 *
 * classe pai
 */

import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface CommentProps {
  authorId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

/**
 * transformando a classe em abstrata, em orientado ao objeto classe abstrata
 *  não pode ser extanciada só, tem que extender de outra classe.
 * ou seja, feito isso ela não pode ser chamda com new Comment ou comment.execute
 */

/**
 * Extendendo props com generico do typescript
 *
 * no generico chamamos props e extendemos com commetProps.
 *
 * assim onde chamar ela podemos adicionar mais propriedades.
 *
 * desse modo passamos Props para Entity como genérico.
 */

export abstract class Comment<
  Props extends CommentProps,
> extends Entity<Props> {
  /**
   * Implementando os métodos Getters e Setters
   * os campos de acessos
   */
  get authorId() {
    return this.props.authorId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get content() {
    return this.props.content
  }
}
