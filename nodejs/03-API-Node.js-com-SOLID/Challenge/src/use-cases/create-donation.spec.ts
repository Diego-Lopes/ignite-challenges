import { InMemoryDonationPetsRepository } from '@/repositories/in-memory/in-memory-donationPets-repository'
import { describe, expect, it } from 'vitest'
import { CreateDonationPetUseCase } from './create-donationPet'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

describe('Create donation pet Use Case', () => {
  it('shold be able to create a donation pet', async () => {
    const prismaDonationPetsRepository = new InMemoryDonationPetsRepository()
    const prismaOrganizationsRepository = new InMemoryOrganizationsRepository()

    const createDonationPetUseCase = new CreateDonationPetUseCase(
      prismaDonationPetsRepository,
      prismaOrganizationsRepository,
    )

    const { donationPet } = await createDonationPetUseCase.execute({
      name: 'string',
      species: 'string',
      age: 1,
      description: 'null',
      state: 'string',
      city: 'string',
      images: [''],
      organizationId: '44eaef60-898b-4ba5-9f6d-c6a467e0c343',
      adopted: null,
    })

    expect(donationPet.id).toEqual(expect.any(String))
  })
})
