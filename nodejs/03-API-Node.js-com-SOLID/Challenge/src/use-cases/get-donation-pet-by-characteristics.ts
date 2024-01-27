/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-constructor */
import { DonationPetsRepository } from '@/repositories/donation-pet-interfaces-repository'
import { DonationPet } from '@prisma/client'
import { ErrorGeneric } from './errors/error-generic'
import { NotExistDonationPetByCharacteristic } from './errors/not-exists-donation-pet-by-characteristic'

interface GetDonationPetByCharacteriticUseCaseRequest {
  q: string
}

interface GetDonationPetByCharacteriticUseCaseResponse {
  donationPets: DonationPet[] | null
}
export class GetAllDonationPetByCharacteritic {
  constructor(private donationPetsRepository: DonationPetsRepository) { }

  async execute({
    q,
  }: GetDonationPetByCharacteriticUseCaseRequest): Promise<GetDonationPetByCharacteriticUseCaseResponse> {

    if (!q) {
      throw new ErrorGeneric()
    }

    const donationPets =
      await this.donationPetsRepository.findAllDonationPetOfCharacteristic(q)


    if (donationPets?.length === 0) {
      throw new NotExistDonationPetByCharacteristic()
    }

    return {
      donationPets,
    }
  }
}
