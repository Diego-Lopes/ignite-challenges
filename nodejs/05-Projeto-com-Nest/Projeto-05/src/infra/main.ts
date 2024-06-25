import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
    // fallbackOnErrors: true,
  })

  const envService = app.get(EnvService)
  // o segundo parâmetros do generico config service tem wasvalited ele faz com que a variável de ambiente não fica undefined.
  const port = envService.get('PORT')

  await app.listen(port)
}
bootstrap()
