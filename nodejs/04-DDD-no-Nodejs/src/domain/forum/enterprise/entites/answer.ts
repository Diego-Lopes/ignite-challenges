import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optinal'
import { AnswerAttachmentList } from './answer-attachment-list'

export interface AnswerProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  attachements: AnswerAttachmentList
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  /**
   * Implementando os métodos Getters e Setters
   */
  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get attachments() {
    return this.props.attachements
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  // basicamento um resumo da resposta
  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
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

  set attachments(attachements: AnswerAttachmentList) {
    this.props.attachements = attachements
    this.touch()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }
  /**
   * como estamos passando props da classe entity não precisamos das variáveis
   * publica da class answer e demais.
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
   * Como já temos o construtor na classe entiti o contrutor dessa classe
   * acaba sendo inútil.
   */

  // constructor(props: AnswerProps, id?: string) {
  //   /**
  //    * quando estendemos uma classe é necessário o uso do super()
  //    *
  //    * ao invés de chamar this.props.content
  //    * chamamos no super também.
  //    */
  //   super(props, id)

  //   // this.content = props.content
  //   // this.authorId = props.authorId
  //   // this.questionId = props.questionId
  // }

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
    props: Optional<AnswerProps, 'createdAt' | 'attachements'>,
    id?: UniqueEntityID,
  ) {
    const answer = new Answer(
      {
        ...props,
        attachements: props.attachements ?? new AnswerAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answer
  }
}
