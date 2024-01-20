import { OrganizationNotExisteError } from '@/use-cases/errors/organizaton-not-exists-error'
import { Organization, Prisma } from '@prisma/client'

/**
 * usei interfaces no nome do arquivo para uso didatico.
 * Interface de métodos de organization.
 */
export interface OrganizationsRepository {
  findById(id: string): Promise<Organization | OrganizationNotExisteError>
  findByEmail(email: string): Promise<Organization | null>
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
}
