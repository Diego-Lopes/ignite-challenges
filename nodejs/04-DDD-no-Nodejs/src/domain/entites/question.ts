import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optinal";

interface QuestionProps {
  authorId: UniqueEntityID
  bestAnswerId: UniqueEntityID
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
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
  static create(props: Optional<QuestionProps, 'createdAt'>, id?: UniqueEntityID) {
    const question = new Question({
      ...props,
      createdAt: new Date(),
    }, id)

    return question
  }
}