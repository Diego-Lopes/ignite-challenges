import { PrismaDonationPetsRepository } from '@/repositories/prisma/prisma-donationPets-repository'
import { GetAllDonationPetByCharacteritic } from '../get-donation-pet-by-characteristics'

export function makeGetAllDonationPetByCharacteristicUseCase() {
  const donantionPetsRepository = new PrismaDonationPetsRepository()

  const useCase = new GetAllDonationPetByCharacteritic(donantionPetsRepository)

  return useCase
}
