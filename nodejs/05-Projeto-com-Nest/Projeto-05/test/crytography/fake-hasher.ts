/**
 * Stub é implementação fictícia de um contrato, usado para testes.
 */

import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'

export class FakerHasher implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    // como é teste não compensa criptografar de verdade
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
