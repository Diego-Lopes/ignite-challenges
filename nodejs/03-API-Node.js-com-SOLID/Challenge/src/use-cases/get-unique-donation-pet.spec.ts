import { expect, describe, it } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryDonationPetsRepository } from '@/repositories/in-memory/in-memory-donationPets-repository'
import { CreateDonationPetUseCase } from './create-donationPet'
import { GetUniqueDonationPetUseCase } from './get-unique-donation-pet'

describe('Get unique donation Pet of get unique donation pet Use Case', () => {
  it('should be able to get unique donation pet', async () => {
    const prismaDonationPetsRepository = new InMemoryDonationPetsRepository()
    const getUniqueDonationPet = new GetUniqueDonationPetUseCase(
      prismaDonationPetsRepository,
    )

    const prismaOrganizationsRepository = new InMemoryOrganizationsRepository()

    const createDonationPetUseCase = new CreateDonationPetUseCase(
      prismaDonationPetsRepository,
      prismaOrganizationsRepository,
    )

    const data = await createDonationPetUseCase.execute({
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

    const { donationPet } = await getUniqueDonationPet.execute({
      id: data.donationPet.id,
    })

    expect(donationPet).toEqual(expect.any(Object))
  })
})
