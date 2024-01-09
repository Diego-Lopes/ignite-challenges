import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaOrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const organizationWithSameEmail = await prisma.organization.findUnique({
      where: {
        email: data.email,
      },
    })

    if (organizationWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }
}
