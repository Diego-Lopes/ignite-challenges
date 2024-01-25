import { expect, describe, it } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryDonationPetsRepository } from '@/repositories/in-memory/in-memory-donationPets-repository'
import { GetAllDonationPetOfCityUseCase } from './get-all-donation-pet-of-city'
import { CreateDonationPetUseCase } from './create-donationPet'

describe('Get all donation Pet of city Use Case', () => {
  it('should be able to get all donation pet of city', async () => {
    const prismaDonationPetsRepository = new InMemoryDonationPetsRepository()
    const getAllDonationPets = new GetAllDonationPetOfCityUseCase(
      prismaDonationPetsRepository,
    )

    const prismaOrganizationsRepository = new InMemoryOrganizationsRepository()

    const createDonationPetUseCase = new CreateDonationPetUseCase(
      prismaDonationPetsRepository,
      prismaOrganizationsRepository,
    )

    await createDonationPetUseCase.execute({
      name: 'string',
      species: 'string',
      age: 1,
      description: 'null',
      state: 'string',
      city: 'ji-parana',
      images: [''],
      organizationId: '44eaef60-898b-4ba5-9f6d-c6a467e0c343',
      adopted: null,
    })

    await createDonationPetUseCase.execute({
      name: 'Luna',
      species: 'string',
      age: 1,
      description: 'null',
      state: 'string',
      city: 'ji-parana',
      images: [''],
      organizationId: '44eaef60-898b-4ba5-9f6d-c6a467e0c343',
      adopted: null,
    })

    const { donationPets } = await getAllDonationPets.execute({
      city: 'ji-parana',
    })

    expect(donationPets.length > 0)
  })
})
