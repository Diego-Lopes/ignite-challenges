/**
 * Conceito do pattern Factory, para automatizar a criação de um acaso de uso
 * pode ter multiplas depêndencias sempre que for usar esse caso de uso, nós temos
 * uma função pronta que devolve todas as depêndencias.
 */

import { PrismaGymsRepository } from '@/repositoreis/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'
import { PrismaCheckInsRepository } from '@/repositoreis/prisma/prisma-check-ins-repository'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
