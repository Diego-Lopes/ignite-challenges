import { Prisma } from "@prisma/client";
import { DonationPetsRepository } from "../donation-pet-interfaces-repository";
import { prisma } from "@/lib/prisma";

export class PrismaDonationPetsRepository implements DonationPetsRepository {
  async create(data: Prisma.DonationPetUncheckedCreateInput) {
    const donationPet = await prisma.donationPet.create({
      data
    })

    return donationPet
  }
}