import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";

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
}