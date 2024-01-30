import { DonationPet, Prisma } from '@prisma/client'

export interface DonationPetsRepository {
  create(data: Prisma.DonationPetUncheckedCreateInput): Promise<DonationPet>
  findAllDonationPetOfCity(city: string): Promise<DonationPet[]>
  findAllDonationPetOfCharacteristic(q: string): Promise<DonationPet[] | null>
  getUniqueDonationPet(id: string): Promise<DonationPet | null>
}
