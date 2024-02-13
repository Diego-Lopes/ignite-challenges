import { randomUUID } from 'node:crypto'

/**
 * aqui vai ficar a lógica de crianção de randoUUID
 * para toda a aplicação caso mude só vim aqui e mudar.
 */

export class UniqueEntityID {
  private value: string

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }
}
