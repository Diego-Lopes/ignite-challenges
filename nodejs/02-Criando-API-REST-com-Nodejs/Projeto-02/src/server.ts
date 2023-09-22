import fastify from 'fastify'
import { env } from './env'
import { transationsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

const app = fastify()

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

app
  .listen({ port: env.PORT })
  .then(() => console.log(`HTTP Server listening on port ${env.PORT}`))
