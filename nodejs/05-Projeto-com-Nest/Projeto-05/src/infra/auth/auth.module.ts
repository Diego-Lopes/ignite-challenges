import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'
import { JwtAuthGuard } from './jwt-auth.guard'
import { JwtStrategy } from './jwt.strategy'

/**
 * para funcionar esse módulo tem que instalar 2 bibliotecas
 * @nestjs/passport e @nest/jwt
 */

// aqui é configuração global da aplicação.

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory(env: EnvService) {
        // isso é uma inversão de dependência e é assim na documentação do nestjs reconhecer config service
        const privateKey = env.get('JWT_PRIVATE_KEY')
        const publicKey = env.get('JWT_PUBLIC_KEY')
        return {
          signOptions: { algorithm: 'RS256' }, // precisamo passar o tipo de algoritmo que estamos usando.
          privateKey: Buffer.from(privateKey, 'base64'), // buffer é carregar dados em memoria no node.
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
  ],
  providers: [
    JwtStrategy,
    EnvService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ], // passando a class jwt.strategy para ser reconhecida.
})
export class AuthModule { }
