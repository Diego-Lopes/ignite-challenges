import { DonationPet, Prisma } from '@prisma/client'
import { DonationPetsRepository } from '../donation-pet-interfaces-repository'
import { randomUUID } from 'node:crypto'
import { NotExistDonationPetByCity } from '@/use-cases/errors/not-exists-donation-pet-by-city'

export class InMemoryDonationPetsRepository implements DonationPetsRepository {
  public items: DonationPet[] = []

  create(data: Prisma.DonationPetUncheckedCreateInput): Promise<DonationPet> {
    const donationPet = {
      id: `${randomUUID()}`,
      name: data.name,
      species: data.species,
      age: data.age,
      description: data.description ?? null,
      state: data.state,
      city: data.city,
      adopted: data.adopted ?? null,
      created_at: new Date(),
      date_donation: new Date() ?? null,
      images: data.images as string[],
      organization_id: '5569',
    }

    this.items.push(donationPet)

    return Promise.resolve(donationPet)
  }
}
