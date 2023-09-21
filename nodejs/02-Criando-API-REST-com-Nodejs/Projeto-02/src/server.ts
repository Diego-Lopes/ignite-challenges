import fastify from 'fastify'
import { env } from './env'
import { transationsRoutes } from './routes/transactions'

const app = fastify()

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
