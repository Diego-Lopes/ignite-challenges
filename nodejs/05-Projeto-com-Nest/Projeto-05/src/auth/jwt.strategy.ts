import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Env } from 'src/env'
import { z } from 'zod'

const tokenSchema = z.object({
  sub: z.string().uuid(),
})

type TokenSchema = z.infer<typeof tokenSchema>

// Quando usa injectable significa que ele está em um provider, no nest quanod está em provider tem que usar Injectable para injeção de arquivo.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })
    // para validar o usuário só precisamos da chave pública,

    // super chamar o constructor da class PassportStrategy
    // essa configuração está no site oficial do nestjs em implementing passport jwt
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // isso aqui pega o teken de um determinado lugar, tem varios modos
      secretOrKey: Buffer.from(publicKey, 'base64'), // fazendo a leitura do base64
      algorithms: ['RS256'],
    })
  }

  // criando um método com foco de validar as informações do token
  // validar as informações do sub do token com as informações necessárias para o token ter.
  async validate(payload: TokenSchema) {
    return tokenSchema.parse(payload)
  }
}
