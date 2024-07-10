/**
 * Os erros dentro da pasta use-cases tem que ser bem semânticos
 */

import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidAttachmentTypeError extends Error implements UseCaseError {
  constructor(type: string) {
    super(`File type "${type}" is not valid.`)
  }
}
