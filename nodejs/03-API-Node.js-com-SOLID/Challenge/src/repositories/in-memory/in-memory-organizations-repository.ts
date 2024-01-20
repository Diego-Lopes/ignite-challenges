/* eslint-disable prettier/prettier */
import { Prisma, Organization, Role } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-interfaces-repository'
import { OrganizationNotExisteError } from '@/use-cases/errors/organizaton-not-exists-error'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository {
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: 'organ-1',
      city: data.city,
      description: data.description ?? null,
      email: data.email,
      latitude: new Prisma.Decimal(Number(data?.latitude)) ?? null,
      longitude: new Prisma.Decimal(Number(data?.longitude)) ?? null,
      phone: data.phone,
      role: Role.ORG,
      state: data.state,
      title: data.title,
      user_name: data.user_name,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async findById(id: string) {
    const organization = this.items.find((item) => item.id === id)

    if (!organization) {
      return new OrganizationNotExisteError()
    }

    return organization
  }
}
