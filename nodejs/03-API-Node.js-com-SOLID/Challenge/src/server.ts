import { app } from './app'
import { env } from './env'

app
  .listen({
    host: '0.0.0.0', // rack para liberar acesso para aplicações front-end em localhost.
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP Server Running in port:', env.PORT)
  })
