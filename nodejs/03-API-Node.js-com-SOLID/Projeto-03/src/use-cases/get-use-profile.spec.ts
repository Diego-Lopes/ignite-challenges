import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositoreis/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
    // sut tipo de pattern para usar em testes principais
  })
  it('should be able to get user profile', async () => {
    // depois que criar o usuário
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password_hash: await hash('1234994', 6),
    })

    // tentamos pegar o id do usuário
    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe') // espero que retorn o nome do usuário

    it('should not be able to get user profile with wrong id', async () => {
      await expect(() =>
        sut.execute({
          userId: 'non-existing-id',
        }),
      ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
  })
})
