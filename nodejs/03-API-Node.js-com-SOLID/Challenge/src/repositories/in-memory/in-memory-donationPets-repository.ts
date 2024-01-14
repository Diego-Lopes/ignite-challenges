import { DonationPet, Prisma } from "@prisma/client";
import { DonationPetsRepository } from "../donation-pet-interfaces-repository";
import { randomUUID } from "node:crypto";

export class InMemoryDonationPetsRepository implements DonationPetsRepository {

  public items: DonationPet[] = []


  create(data: Prisma.DonationPetCreateInput) {
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
      images: [data.images] ?? null,
      organization_id: 'xxx'
    }

    this.items.push(donationPet)
    return donationPet
  }


}