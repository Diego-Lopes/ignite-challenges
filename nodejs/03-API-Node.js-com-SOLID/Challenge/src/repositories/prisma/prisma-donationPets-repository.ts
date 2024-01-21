import { Prisma } from '@prisma/client'
import { DonationPetsRepository } from '../donation-pet-interfaces-repository'
import { prisma } from '@/lib/prisma'

export class PrismaDonationPetsRepository implements DonationPetsRepository {
  async create(data: Prisma.DonationPetUncheckedCreateInput) {
    const donationPet = await prisma.donationPet.create({
      data,
    })

    return donationPet
  }

  async findPetsByCity(city: string) {
    const donationPet = await prisma.donationPet.findMany({
      where: {
        city,
      },
    })

    return donationPet
  }
}
