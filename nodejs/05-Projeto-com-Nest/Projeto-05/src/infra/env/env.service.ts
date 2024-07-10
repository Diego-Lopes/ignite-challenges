import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'
/**
 * Nosso próprio serviço que busca as variáveis de ambiente.
 */
@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) { }

  get<T extends keyof Env>(key: T) {
    // Aqui temos uma tipagem genérica onde o tipo de key e passado para T
    return this.configService.get(key, { infer: true })
  }
}
