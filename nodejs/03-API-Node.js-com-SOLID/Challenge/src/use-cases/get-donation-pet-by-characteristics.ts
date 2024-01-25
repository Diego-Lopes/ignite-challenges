/* eslint-disable no-useless-constructor */
import { DonationPetsRepository } from '@/repositories/donation-pet-interfaces-repository'
import { DonationPet } from '@prisma/client'
import { NotExistDonationPetByCity } from './errors/not-exists-donation-pet-by-city'

interface GetDonationPetByCharacteriticUseCaseRequest {
  q: string
}

interface GetDonationPetByCharacteriticUseCaseResponse {
  donationPets: DonationPet[]
}
export class GetDonationPetByCharacteritic {
  // eslint-disable-next-line prettier/prettier
  constructor(private donationPetsRepository: DonationPetsRepository) { }

  async execute({
    q,
  }: GetDonationPetByCharacteriticUseCaseRequest): Promise<GetDonationPetByCharacteriticUseCaseResponse> {
    const donationPets =
      await this.donationPetsRepository.findAllDonationPetOfCharacteristic(q)

    if (donationPets?.length === 0 || !donationPets) {
      throw new NotExistDonationPetByCity()
    }

    return {
      donationPets,
    }
  }
}
