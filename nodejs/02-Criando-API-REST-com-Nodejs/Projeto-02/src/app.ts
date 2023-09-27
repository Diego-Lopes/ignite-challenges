import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { transationsRoutes } from './routes/transactions'

export const app = fastify()

// fazendo o cadastro de registro em cookie
app.register(cookie)
// usando plugin do fastify
/**
 * define bem as ordem pois dependendo da posição de um plugin e nele precisa
 * modificar dados e não estives ordenado certo dará problema.
 */
app.register(transationsRoutes, {
  prefix: 'transactions', // colocando prefixo de transacions e lá na routes/transactions colocamos apenas /
})
