import { app } from './app'
import { env } from './env'

app
  .listen({ port: env.PORT })
  .then(() => console.log(`HTTP Server listening on port ${env.PORT}`))
