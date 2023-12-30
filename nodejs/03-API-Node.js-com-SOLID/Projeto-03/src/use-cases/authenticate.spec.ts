import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositoreis/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
    // sut tipo de pattern para usar em testes principais
  })
  it('Should be able to authenticate', async () => {
    /**
     * antes de iniciar nosso test de logar precisamos cadastrar e podemos
     * fazer um await para cadastrar um usuário com o método direto que é
     * userRepository
     */
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password_hash: await hash('1234994', 6),
    })

    const { user } = await sut.execute({
      email: 'john.doe@gmail.com',
      password: '1234994',
    })

    expect(user.id).toEqual(expect.any(String))
    /**
     * Espero que id dessa função seja igual a qualquer string
     */

    it('should not be able to authenticate with wrong email', async () => {
      await expect(() =>
        sut.execute({
          email: 'johndoe@example.com',
          password: '123456',
        }),
      ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong email', async () => {
      await usersRepository.create({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password_hash: await hash('123456', 6),
      })

      await expect(() =>
        sut.execute({
          email: 'johndoe@example.com',
          password: '123123',
        }),
      ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
  })
})
