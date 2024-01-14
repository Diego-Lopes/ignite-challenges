import { PrismaDonationPetsRepository } from '@/repositories/prisma/prisma-donationPets-repository'
import { CreateDonationPetUseCase } from '../create-donationPet'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'

export function makeDonationPetUseCase() {
  const donantionPetsRepository = new PrismaDonationPetsRepository()
  const organizationRepository = new PrismaOrganizationsRepository()

  const useCase = new CreateDonationPetUseCase(
    donantionPetsRepository,
    organizationRepository,
  )

  return useCase
}
