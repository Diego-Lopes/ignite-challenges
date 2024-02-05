import { Entity } from "../../core/entities/entity"

interface StudentProps {
  name: string
}

export class Student extends Entity<StudentProps> {
  // public name: string

  /**
   * Como já temos o construtor na classe entiti o contrutor dessa classe 
   * acaba sendo inútil.
   */


  // constructor(props: StudentProps, id?: string) {
  //   /**
  //   * quando estendemos uma classe é necessário o uso do super()
  //   */
  //   super(props, id)

  //   // this.name = props.name
  // }
}