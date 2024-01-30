import { PrismaDonationPetsRepository } from '@/repositories/prisma/prisma-donationPets-repository'
import { GetUniqueDonationPetUseCase } from '../get-unique-donation-pet'

export function makeGetUniqueDonationPetUseCase() {
  const donantionPetsRepository = new PrismaDonationPetsRepository()

  const useCase = new GetUniqueDonationPetUseCase(donantionPetsRepository)

  return useCase
}
