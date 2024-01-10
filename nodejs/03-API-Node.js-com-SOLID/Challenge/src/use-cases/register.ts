/* eslint-disable prettier/prettier */
import { OrganizationsRepository } from '@/repositories/organizations-interfaces-repository'
import { hash } from 'bcryptjs'

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
    role,
    state,
    title,
    userName,
  }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const organizationWithSameEmail = await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    await this.organizationsRepository.create({
      city,
      description,
      email,
      latitude,
      longitude,
      password_hash,
      phone,
      role,
      state,
      title,
      user_name: userName,
    })
  }
}
