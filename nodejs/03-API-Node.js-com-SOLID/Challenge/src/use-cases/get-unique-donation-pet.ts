/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-constructor */
import { DonationPetsRepository } from '@/repositories/donation-pet-interfaces-repository'
import { DonationPet } from '@prisma/client'
import { ErrorGeneric } from './errors/error-generic'
import { NotExistDonationPet } from './errors/not-exists-donation-pet-by-characteristic copy'

interface GetUniqueDonationPetUseCaseRequest {
  id: string
}

interface GetUniqueDonationPetUseCaseResponse {
  donationPet: DonationPet | null
}
export class GetUniqueDonationPetUseCase {
  constructor(private donationPetsRepository: DonationPetsRepository) { }

  async execute({
    id,
  }: GetUniqueDonationPetUseCaseRequest): Promise<GetUniqueDonationPetUseCaseResponse> {

    if (!id) {
      throw new ErrorGeneric()
    }

    const donationPet =
      await this.donationPetsRepository.getUniqueDonationPet(id)


    if (!donationPet) {
      throw new NotExistDonationPet()
    }

    return {
      donationPet,
    }
  }
}
