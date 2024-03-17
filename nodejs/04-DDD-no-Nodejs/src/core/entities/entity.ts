import { UniqueEntityID } from './unique-entity-id'

/**
 * Podemos passar para Entity um generic props, que é basicamente
 * um parâmetro de tipagem.
 * pode ser representado por qualquer nome entre maior que e menor que, mas para
 * uso de estudo vamos deixa semântica.
 */
export abstract class Entity<Props> {
  // private protege a variável, nosso caso não queremos que o id, seja mudado.
  // uma vez criado não pode ser modificado.
  private _id: UniqueEntityID

  /**
   * Protected diferente de private ele pode ser acessado pela classe entity e
   * por que os estende, protected bem parecido orientação objeto.
   */
  protected props: Props

  get id() {
    return this._id
  }

  /**
   * Criando propriedade constructor, como todas as entidades tem props fica muito
   * fácil de usar e como todos tem id opcional também fica fácil, então criando um constructor
   * ajuda nas criações de ids.
   */
  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID()
  }
}
