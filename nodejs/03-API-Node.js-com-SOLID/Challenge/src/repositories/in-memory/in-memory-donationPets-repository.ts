import { DonationPet, Prisma } from '@prisma/client'
import { DonationPetsRepository } from '../donation-pet-interfaces-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryDonationPetsRepository implements DonationPetsRepository {
  public items: DonationPet[] = []

  findAllDonationPetOfCharacteristic(q: string) {
    const donationPets = this.items.filter((donationPets) => {
      return donationPets.species === q
    })

    if (!donationPets) {
      return null
    }

    return donationPets
  }

  create(data: Prisma.DonationPetUncheckedCreateInput) {
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

  findAllDonationPetOfCity(city: string) {
    const donationPets = this.items.filter(
      (donationPet) => donationPet.city === city,
    )

    // console.log({ donationPets })

    return Promise.resolve(donationPets)
  }

  getUniqueDonationPet(id: string) {
    const donationPet = this.items.find((obj) => obj.id === id)

    return Promise.resolve(donationPet)
  }
}
/**
 * Terminar de inserir a lógica de busaca em memoria, depois da missa.
 */
