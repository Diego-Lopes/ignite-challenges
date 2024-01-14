import { DonationPet, Prisma } from '@prisma/client'

export interface DonationPetsRepository {
  create(data: Prisma.DonationPetUncheckedCreateInput): Promise<DonationPet>
}
