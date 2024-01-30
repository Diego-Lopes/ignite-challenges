import { expect, describe, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentials } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const prismaOrganizationsRepository = new InMemoryOrganizationsRepository()
    const sut = new AuthenticateUseCase(prismaOrganizationsRepository)

    await prismaOrganizationsRepository.create({
      city: 'New York',
      description: 'New York',
      email: 'prisma@prisma1.com',
      latitude: null,
      longitude: null,
      password_hash: await hash('123456', 6),
      phone: '123456',
      role: 'ADMIN',
      state: 'New York',
      title: 'New York',
      user_name: 'prisma',
    })

    const { organization } = await sut.execute({
      email: 'prisma@prisma1.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate with wrong email', async () => {
    const prismaOrganizationsRepository = new InMemoryOrganizationsRepository()
    const sut = new AuthenticateUseCase(prismaOrganizationsRepository)

    expect(() =>
      sut.execute({
        email: 'prisma@prisma1.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentials)
  })

  it('should be able to authenticate with wrong password', async () => {
    const prismaOrganizationsRepository = new InMemoryOrganizationsRepository()
    const sut = new AuthenticateUseCase(prismaOrganizationsRepository)

    await prismaOrganizationsRepository.create({
      city: 'New York',
      description: 'New York',
      email: 'prisma@prisma1.com',
      latitude: null,
      longitude: null,
      password_hash: await hash('123456', 6),
      phone: '123456',
      role: 'ADMIN',
      state: 'New York',
      title: 'New York',
      user_name: 'prisma',
    })

    expect(() =>
      sut.execute({
        email: 'prisma@prisma1.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentials)
  })
})
