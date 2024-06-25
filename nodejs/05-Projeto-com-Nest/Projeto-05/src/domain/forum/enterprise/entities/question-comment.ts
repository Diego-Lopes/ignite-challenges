import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optinal'
import { Comment, CommentProps } from './comment'

/**
 * herdano da classe Comment
 */

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityID
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  /**
   * Abstraindo criação de entidade, vamos usar create para simular um contructor
   * lá no arquivo entity em entities vamos deixar contructor de lá protegido, protected deixa
   * chamar em outras classe usando new.
   *
   * Usando static não precisamos usar constructor é só chamar ex.: Question.create()
   *
   * @description Abstraindo criação de entidade
   */
  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return questionComment
  }
}
