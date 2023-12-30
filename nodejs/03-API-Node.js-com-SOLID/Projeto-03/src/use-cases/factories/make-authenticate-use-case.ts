/**
 * Isso é um pattern, factory pattern, esse pattern chamado factory,
 * nada mais é que uma fabrica que criar casos de testes, usa-se no inicio make,
 * simbolizando o que uma fabrica faz, criar!
 */
import { PrismaUsersRepository } from '@/repositoreis/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
