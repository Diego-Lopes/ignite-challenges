import { Prisma } from '@prisma/client'

export class InMemoryOrganizationsRepository {
  public organizations: Prisma.OrganizationCreateInput[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    this.organizations.push(data)
    console.log(this.organizations)
  }
}
