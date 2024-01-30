import { Prisma } from '@prisma/client'
import { DonationPetsRepository } from '../donation-pet-interfaces-repository'
import { prisma } from '@/lib/prisma'

export class PrismaDonationPetsRepository implements DonationPetsRepository {
  async findAllDonationPetOfCharacteristic(q: string) {
    const donationPet = await prisma.donationPet.findMany({
      where: {
        species: q,
      },
    })

    return donationPet
  }

  async create(data: Prisma.DonationPetUncheckedCreateInput) {
    const donationPet = await prisma.donationPet.create({
      data,
    })

    return donationPet
  }

  async findAllDonationPetOfCity(city: string) {
    const donationPet = await prisma.donationPet.findMany({
      where: {
        city,
      },
    })

    return donationPet
  }

  async getUniqueDonationPet(id: string) {
    const detailsDonationPet = await prisma.donationPet.findUnique({
      where: {
        id,
      },
    })

    return detailsDonationPet
  }
}
