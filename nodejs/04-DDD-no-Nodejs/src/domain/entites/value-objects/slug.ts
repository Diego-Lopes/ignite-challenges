/**
 * Sobre Value object 
 * possui uma regra de negócio ex.: string deve ter 250 caracteres.
 * caso precisamos ter varias tratativas de regra de negócio em um determinado
 * propriede como slug temos chama-se de value object um objeto com mais de x
 * valores agregados.
 */

export class Slug {
  //criando uma estrutura 

  //criando variável pública
  public value: string

  constructor(value: string) {
    this.value = value;
  }

  //criando método estático
  /**
   * Revice a string and normalize it as a slug.
   * 
   * exemple: "An exemple title" => "an-exemple-title"
   * 
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize("NFKD")
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, "")
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/, '') // remove - no final

    return new Slug(slugText)
  }

}