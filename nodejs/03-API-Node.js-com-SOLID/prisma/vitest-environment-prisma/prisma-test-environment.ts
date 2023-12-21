/**
 * criando variavel de ambiente, isso é baseado nos conhecimento
 * do Diego da Rocketseat, famoso hackerzinho.
 */
import { Environment } from 'vitest'

// tipando o defualt usando generic <>
export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    console.log('Setup')

    return {
      async teardown() {
        console.log('Teardown')
      },
    }
  },
}

/**
 * Usando [npm link] no caminho prisma/vitest-environment-prisma
 * npm faz ligação no package.json do projeto principal para ser reconhecido.
 * Depois no package.json principal usamos o comando npm i vitest-environment-prisma
 */
