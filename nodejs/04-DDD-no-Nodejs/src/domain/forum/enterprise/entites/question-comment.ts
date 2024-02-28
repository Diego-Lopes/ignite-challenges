import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optinal'

export interface QuestionCommentProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class QuestionComment extends Entity<QuestionCommentProps> {
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

  /**
   * Para usar setters tem que fazer a seguinte pergunta, faz sentido
   * mudar o nome do criador da resposta? Faz sentido mudar a data de criação?
   * única coisa que faz sentido é mudar o conteúdo da resposta.
   * e vamos também setar a data de modificação e chamar ele no content para dizer
   * quando foi alterado a resposta.
   */

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }
  /**
   * como estamos passando props da classe entity não precisamos das variáveis
   * publica da class question e demais.
   */
  // public content: string
  // public authorId: string
  // public questionId: string

  /**
   * para que possa ser acessível a chamadas externas vamos usar métodos gets/sets
   * da classe.
   */
  get content() {
    return this.props.content
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
