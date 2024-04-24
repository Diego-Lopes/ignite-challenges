import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable() // usando isso faz com que possa ser utilizado em outras parte da aplicação.
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  // remova a extends para usar a função base abaixo.
  // fazendo a conexão ao banco de dados.
  // public client: PrismaClient

  // constructor() {
  //   this.client = new PrismaClient()
  // }

  // daqui para baixo é usando com extends da classe
  // ---------------------------
  /**
   * Podemos usar interface com implements vamos usar dois do nest
   * OnModuleInit e OnModuleDestroy são chamados automaticamente,
   * assim podemos criar uma lógica para se conectar ao bando de dados postgres
   * caso o projeto cracha o método OnModuleDestroy é chamado.
   * caso o projeto é iniciado ele chamad o OnModuleInit
   */
  constructor() {
    // como extendemos o PrismaClient e usamos super a classe em si se torna prismaClient
    // Este super está chamando o construtor da classe prismaClient assim podemos mandar direto ao mesmo uns objetos no super abaixo.
    super({
      log: ['warn', 'error'],
    }) // chamo o super para usar extends da classe acima.
  }

  onModuleInit() {
    return this.$connect()
  }

  onModuleDestroy() {
    // caso de algum error ele faz a desconexão
    return this.$disconnect()
  }
}
