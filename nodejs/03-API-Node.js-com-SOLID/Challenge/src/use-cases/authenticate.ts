/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-constructor */
import { OrganizationsRepository } from '@/repositories/organizations-interfaces-repository'
import { InvalidCredentials } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { Organization } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  organization: Organization
}

export class AuthenticateUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) { }

  // método
  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    // auth
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentials()
    }

    const doesPasswordMatches = await compare(
      password,
      organization.password_hash,
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentials()
    }

    return {
      organization,
    }
  }
}
