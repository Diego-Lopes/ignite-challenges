import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optinal'
import dayjs from 'dayjs'
import { QuestionBestAnswerChosenEvent } from '../events/question-best-answer-chosen-event'
import { QuestionAttachmentList } from './question-attachment-list'
import { Slug } from './value-objects/slug'

export interface QuestionProps {
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  title: string
  content: string
  slug: Slug
  attachments: QuestionAttachmentList
  createdAt: Date
  updatedAt?: Date
}

export class Question extends AggregateRoot<QuestionProps> {
  /**
   * Implementando os métodos Getters e Setters
   */
  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: QuestionAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
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

  /**
   * Criando uma lógica para atualizar o título e slug
   */
  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)

    this.touch()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  // setar a melhor resposta.
  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    if (bestAnswerId === undefined) {
      return
    }

    if (
      this.props.bestAnswerId === undefined ||
      !this.props.bestAnswerId.equals(bestAnswerId)
    ) {
      this.addDomainEvent(new QuestionBestAnswerChosenEvent(this, bestAnswerId))
    }

    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  // public title: string
  // public slug: Slug
  // public content: string
  // public authorId: string

  /**
   * Como já temos o construtor na classe entiti o contrutor dessa classe
   * acaba sendo inútil.
   */

  // constructor(props: QuestionProps, id?: string,) {
  //   /**
  //   * quando estendemos uma classe é necessário o uso do super()
  //   */
  //   super(props, id)

  //   // this.title = props.title;
  //   // this.content = props.content;
  //   // this.slug = props.slug;
  //   // this.authorId = props.authorId;
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
    props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? new QuestionAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }
}
