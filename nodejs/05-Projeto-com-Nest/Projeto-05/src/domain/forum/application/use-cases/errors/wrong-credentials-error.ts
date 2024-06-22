/**
 * Os erros dentro da pasta use-cases tem que ser bem semânticos
 */

import { UseCaseError } from '@/core/errors/use-case-error'

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super(`Credentials are not valid.`)
  }
}
