/**
 * either traduzindo para pt, um ou outro
 * retorna sucesso ou erro.
 *
 * Vamos usar um key words/ nomenclaturas conhecida na comunidade
 * LEFT / RIGHT
 * LEFT: representa um erro.
 * RIGHT: representa um sucesso.
 *
 * Um chamada segue um fluxo linear então para entender melhor left/right
 * temos o exemplo abaixo.
 *
 * exemplo de caso:
 * UI -> CTRL -> CASO DE USO -> ENTIDADE -> CASO DE USO -> REPOSITÓRIO -> BANCO DE DADOS
 * o fluxo é sempre contínuo sempre sentido da direita, ou seja na lógica ideal sucesso.
 *
 * UI -> CTRL <- CASO DE USO
 * O fluxo nesse exemplo ocorreu um erro e para representar isso a flecha aponta para esquerda
 * que é sentido de erro, voltando o fluxo.
 *
 */
// error
export class Left<L> {
  /**
   * @description readonly não pode ser alterada após sua inicialização.
   */
  readonly value: L

  constructor(value: L) {
    this.value = value
  }
}

// success
export class Right<R> {
  /**
   * @description readonly não pode ser alterada após sua inicialização.
   */
  readonly value: R

  constructor(value: R) {
    this.value = value
  }
}

/**
 * Agora vamos trabalhar com a tipagem para defenimos um ou outro.
 */
export type Either<L, R> = Left<L> | Right<R>

// aqui é criações de funções para automatizar classe acima.
// <>():T<> => {} genérico na frente arrow function chamase inferir, existe no typescript, aqui usamos para automatizar.

export const left = <L, R>(value: L): Either<L, R> => {
  // vamos usar usar formato de constante recebe uma arrow function pois podemos
  // fazer tratativas mais profunda, que funtion left {} não tem muita flexibilidade.
  return new Left(value)
}

export const right = <L, R>(value: R): Either<L, R> => {
  // vamos usar usar formato de constante recebe uma arrow function pois podemos
  // fazer tratativas mais profunda, que funtion left {} não tem muita flexibilidade.
  return new Right(value)
}
