import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { envSchema } from './env/env'
import { EnvModule } from './env/env.module'
import { HttpModule } from './http/http.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env), // validate é uma função que recebe uma propriedade do env
      isGlobal: true, // essa opção deixa global para todos os modules da aplicação.
    }),
    AuthModule, // tudo que eu definir em authModule vai passar funcionar automaticamente em todo app
    HttpModule,
    EnvModule,
  ],
})
export class AppModule { }
