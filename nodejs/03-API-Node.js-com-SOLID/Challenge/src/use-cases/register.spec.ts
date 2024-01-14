import { expect, describe, it } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'
import { RegisterUseCase } from './register'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const prismaOrganizationsRepository = new InMemoryOrganizationsRepository()
    const registerUseCase = new RegisterUseCase(prismaOrganizationsRepository)

    const { organization } = await registerUseCase.execute({
      city: 'New York',
      description: 'New York',
      email: 'prisma@prisma1.com',
      latitude: null,
      longitude: null,
      password: '123456',
      phone: '123456',
      role: 'ADMIN',
      state: 'New York',
      title: 'New York',
      userName: 'prisma',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash organization password upon registration', async () => {
    const prismaOrganizationsRepository = new InMemoryOrganizationsRepository()
    const registerUseCase = new RegisterUseCase(prismaOrganizationsRepository)

    const { organization } = await registerUseCase.execute({
      city: 'New York',
      description: 'New York',
      email: 'prisma@prisma1.com',
      latitude: null,
      longitude: null,
      password: '123456',
      phone: '123456',
      role: 'ADMIN',
      state: 'New York',
      title: 'New York',
      userName: 'prisma',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const OrganizationsRepository = new InMemoryOrganizationsRepository()
    const registerUseCase = new RegisterUseCase(OrganizationsRepository)


    await registerUseCase.execute({
      city: 'New York',
      description: 'New York',
      email: 'prisma@prisma1.com',
      latitude: null,
      longitude: null,
      password: '123456',
      phone: '123456',
      role: 'ADMIN',
      state: 'New York',
      title: 'New York',
      userName: 'prisma',
    })

    // espero que rejeito esse await por email repetido
    await expect(() =>
      registerUseCase.execute({
        city: 'New York',
        description: 'New York',
        email: 'prisma@prisma1.com',
        latitude: null,
        longitude: null,
        password: '123456',
        phone: '123456',
        role: 'ADMIN',
        state: 'New York',
        title: 'New York',
        userName: 'prisma',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
