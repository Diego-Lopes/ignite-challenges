import { NotExistDonationPetByCity } from '@/use-cases/errors/not-exists-donation-pet-by-city'
import { DonationPet, Prisma } from '@prisma/client'

export interface DonationPetsRepository {
  create(data: Prisma.DonationPetUncheckedCreateInput): Promise<DonationPet>
  findAllDonationPetOfCity(city: string): Promise<DonationPet[]>
}
