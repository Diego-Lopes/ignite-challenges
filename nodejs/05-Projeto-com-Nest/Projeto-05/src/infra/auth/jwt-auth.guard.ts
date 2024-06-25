import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from './public'
/**
 * Implementando uma verificação de autenticação.
 * Faz uma varificação no metadata para saber se é um recurso publico ou não.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
      // se o recurso for publico, retornar true
    }

    // se o recurso não for publico, retornar o resultado da verificação
    return super.canActivate(context)
  }
}
