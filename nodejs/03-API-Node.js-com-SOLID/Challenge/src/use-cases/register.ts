/* eslint-disable no-useless-constructor */
/* eslint-disable prettier/prettier */
import { OrganizationsRepository } from '@/repositories/organizations-interfaces-repository'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'
import { Organization } from '@prisma/client'

interface RegisterUseCaseRequest {
  userName: string
  password: string
  title: string
  city: string
  description: string | null
  email: string
  latitude: number | null
  longitude: number | null
  phone: string
  role: 'ADMIN' | 'ORG' | 'USER'
  state: string
}

// implementanto interface para teste unitário.
interface RegisterUseCaseResponse {
  organization: Organization
}

// inversão de dependencia e usamos interface para fazer imensão no prisma
export class RegisterUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) { }

  async execute({
    city,
    description,
    email,
    latitude,
    longitude,
    password,
    phone,
    state,
    title,
    userName,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organizationWithSameEmail = await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationsRepository.create({
      city,
      description,
      email,
      latitude,
      longitude,
      password_hash,
      phone,
      state,
      title,
      user_name: userName,
    })


    return {
      organization,
    }
  }
}
