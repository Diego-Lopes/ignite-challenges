import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Env } from 'src/env'

/**
 * para funcionar esse módulo tem que instalar 2 bibliotecas
 * @nestjs/passport e @nest/jwt
 */

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        // isso é uma inversão de dependência e é assim na documentação do nestjs reconhecer config service
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })
        return {
          signOptions: { algorithm: 'RS256' }, // precisamo passar o tipo de algoritmo que estamos usando.
          privateKey: Buffer.from(privateKey, 'base64'), // buffer é carregar dados em memoria no node.
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
  ],
})
export class AuthModule { }
