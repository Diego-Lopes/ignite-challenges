import { expect, describe, it } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryDonationPetsRepository } from '@/repositories/in-memory/in-memory-donationPets-repository'
import { CreateDonationPetUseCase } from './create-donationPet'
import { GetAllDonationPetByCharacteritic } from './get-donation-pet-by-characteristics'

describe('Get specification donation Pet of charecteristics Use Case', () => {
  it('should be able to get all donation pet of specific characteristic', async () => {
    const prismaDonationPetsRepository = new InMemoryDonationPetsRepository()
    const getAllDonationPets = new GetAllDonationPetByCharacteritic(
      prismaDonationPetsRepository,
    )

    const prismaOrganizationsRepository = new InMemoryOrganizationsRepository()

    const createDonationPetUseCase = new CreateDonationPetUseCase(
      prismaDonationPetsRepository,
      prismaOrganizationsRepository,
    )

    await createDonationPetUseCase.execute({
      name: 'string',
      species: 'pitbull',
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
      species: 'pitbull',
      age: 1,
      description: 'null',
      state: 'string',
      city: 'ji-parana',
      images: [''],
      organizationId: '44eaef60-898b-4ba5-9f6d-c6a467e0c343',
      adopted: null,
    })

    const { donationPets } = await getAllDonationPets.execute({
      q: 'pitbull',
    })

    // console.log(donationPets)

    expect(donationPets?.length).toBeGreaterThan(0)
  })
})
