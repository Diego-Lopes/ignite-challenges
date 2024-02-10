import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

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

  /**
  * Abstraindo criação de entidade, vamos usar create para simular um contructor
  * lá no arquivo entity em entities vamos deixar contructor de lá protegido, protected deixa
  * chamar em outras classe usando new.
  * 
  * Usando static não precisamos usar constructor é só chamar ex.: Question.create()
  * 
  * @description Abstraindo criação de entidade
  */
  static create(props: StudentProps, id?: UniqueEntityID) {
    const student = new Student(props, id)

    return student
  }
}