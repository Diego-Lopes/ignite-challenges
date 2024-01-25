import { PrismaDonationPetsRepository } from '@/repositories/prisma/prisma-donationPets-repository'
import { GetAllDonationPetOfCityUseCase } from '../get-all-donation-pet-of-city'

export function makeGetAllDonationPetUseCase() {
  const donantionPetsRepository = new PrismaDonationPetsRepository()

  const useCase = new GetAllDonationPetOfCityUseCase(donantionPetsRepository)

  return useCase
}
