import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optinal";

interface AnswerProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
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
  static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityID) {
    const answer = new Answer({
      ...props,
      createdAt: new Date(),
    }, id)

    return answer
  }
}