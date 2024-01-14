import { Organization, Prisma } from '@prisma/client'

/**
 * usei interfaces no nome do arquivo para uso didatico.
 * Interface de métodos de organization.
 */
export interface OrganizationsRepository {
  findById(id: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
}
