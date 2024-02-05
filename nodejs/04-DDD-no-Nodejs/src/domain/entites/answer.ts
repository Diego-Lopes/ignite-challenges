import { Entity } from "../../core/entities/entity";

interface AnswerProps {
  content: string
  authorId: string
  questionId: string
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
}