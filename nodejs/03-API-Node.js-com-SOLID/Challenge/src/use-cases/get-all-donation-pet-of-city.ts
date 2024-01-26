/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-constructor */
import { DonationPetsRepository } from '@/repositories/donation-pet-interfaces-repository'
import { DonationPet } from '@prisma/client'
import { NotExistDonationPetByCity } from './errors/not-exists-donation-pet-by-city'
import { NeedsACity } from './errors/needs-a-city'

// entrada
interface GetAllDonationPetOfCityUseCaseRequest {
  city: string
}

// saída
interface GetAllDonationPetOfCityUseCaseResponse {
  donationPets: DonationPet[]
}

export class GetAllDonationPetOfCityUseCase {
  constructor(private donationPetsRepository: DonationPetsRepository) { }

  async execute({
    city,
  }: GetAllDonationPetOfCityUseCaseRequest): Promise<GetAllDonationPetOfCityUseCaseResponse> {

    if (!city) {
      throw new NeedsACity()
    }

    const donationPets = await this.donationPetsRepository.findAllDonationPetOfCity(city)

    if (donationPets.length === 0) {
      throw new NotExistDonationPetByCity()
    }

    return { donationPets }
  }
}
