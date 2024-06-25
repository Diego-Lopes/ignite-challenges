import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { z } from 'zod'
import { EnvService } from '../env/env.service'

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
})

export type UserPayload = z.infer<typeof tokenPayloadSchema>

// Quando usa injectable significa que ele está em um provider, no nest quanod está em provider tem que usar Injectable para injeção de arquivo.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(env: EnvService) {
    const publicKey = env.get('JWT_PUBLIC_KEY')
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
  async validate(payload: UserPayload) {
    return tokenPayloadSchema.parse(payload)
  }
}
