import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { JwtService } from '@nestjs/jwt'

export class JwtEncrypter implements Encrypter {
  /**
   * É comum termos dependencia de outros módulos.
   */
  constructor(private jwtService: JwtService) { }

  encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload)
  }
}
