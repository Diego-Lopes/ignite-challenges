/* eslint-disable prettier/prettier */
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

// inversão de dependencia
export class RegisterUseCase {
  constructor(private organizationsRepository: any) { }

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
