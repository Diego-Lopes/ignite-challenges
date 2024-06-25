import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

/**
 * O AuthGuard ele navega no metadata e verifica um booleano chamado
 * IS_PUBLIC_KEY e se o valor for true aquela rota não precisa de autenticação.
 */
