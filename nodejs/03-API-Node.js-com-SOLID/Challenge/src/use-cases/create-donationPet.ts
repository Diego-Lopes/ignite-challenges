/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-constructor */
import { DonationPetsRepository } from '@/repositories/donation-pet-interfaces-repository'
import { OrganizationsRepository } from '@/repositories/organizations-interfaces-repository'
import { DonationPet, Prisma } from '@prisma/client'
import { OrganizationNotExisteError } from './errors/organizaton-not-exists-error'

interface DonationPetUseCaseRequest {
  name: string
  species: string
  age: number
  description?: string
  state: string
  city: string
  adopted: boolean | null
  images: string[] | undefined | Prisma.DonationPetCreateimagesInput
  organizationId: string
}

interface DonationPetUseCaseResponse {
  donationPet: DonationPet
}

export class CreateDonationPetUseCase {
  constructor(
    private donationPetRepository: DonationPetsRepository,
    private organizationRepository: OrganizationsRepository,
  ) { }

  async execute({
    adopted,
    age,
    city,
    description,
    images,
    name,
    species,
    state,
    organizationId,
  }: DonationPetUseCaseRequest): Promise<DonationPetUseCaseResponse> {
    // verficando se existe a organização.
    const organization =
      await this.organizationRepository.findById(organizationId)

    if (!organization) {
      throw new OrganizationNotExisteError()
    }

    const donationPet = await this.donationPetRepository.create({
      age,
      city,
      name,
      species,
      state,
      adopted,
      images,
      description,
      organization_id: organizationId,
    })

    return {
      donationPet,
    }
  }
}
