import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CreateAccountController } from './controllers/create-account.controller'
import { envSchema } from './env'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env), // validate é uma função que recebe uma propriedade do env
      isGlobal: true, // essa opção deixa global para todos os modules da aplicação.
    }),
  ],
  controllers: [CreateAccountController],
  providers: [PrismaService],
})
export class AppModule { }
