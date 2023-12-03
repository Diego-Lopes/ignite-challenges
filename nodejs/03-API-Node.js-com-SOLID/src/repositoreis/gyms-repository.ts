// criando uma interface com as tipagens do prisma

import { Gym } from '@prisma/client'

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
}
