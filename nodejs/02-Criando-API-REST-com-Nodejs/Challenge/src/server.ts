import { app } from './app'
import { env } from './env'
app
  .listen({
    port: env.PORT,
  })
  .then(() => console.log(`HTTP server run http://localhost:${env.PORT} 🎉`))
