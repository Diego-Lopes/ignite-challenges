import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optinal'
import { Comment, CommentProps } from './comment'

/**
 * Como estou extendendo CommentProps em Comment preciso
 * extender em AnswerCommentProps também.
 * herdano da classe Comment
 */
export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityID
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId
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
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answerComment
  }
}
