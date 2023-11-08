import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositoreis/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('Should be able to register', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUseCase(userRepository)

    const { user } = await registerUserCase.execute({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '1234994',
    })

    expect(user.id).toEqual(expect.any(String))
    /**
     * Espero que id dessa função seja igual a qualquer string
     */
  })

  it('Should hash user password upon registration', async () => {
    // const prismaUserRepository = new PrismaUsersRepository()
    /**
     * Sobre teste unitário, precisa ser de alta performace, rápido
     * não precisa se comunicar com banco de dados, pois se comunicar fica muito lento...
     * Isso para um cenário com vários teste acaba sendo não performático,
     * deste modo o ideal é fazer estruturas fictícias... como o medelo abaixo...
     */
    // const registerUserCase = new RegisterUseCase({
    //   // este repositório é local/fake, e não bate no banco de dado.
    //   async findByEmail(email) {
    //     return null
    //   },
    //   async create(data) {
    //     return {
    //       id: 'user-1',
    //       name: data.name,
    //       email: data.email,
    //       password_hash: data.password_hash,
    //       created_at: new Date(),
    //     }
    //   },
    // })

    const userRepository = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUseCase(userRepository)

    const { user } = await registerUserCase.execute({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '1234994',
    })

    console.log(user.password_hash)
    /**
     * Como hash não tem com ser desfeito, então para validar se realmente
     * funciona vamos comparar as hashs
     */

    const isPasswordCorrectlyHashed = await compare(
      '1234994',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able to register with same email twice', async () => {
    const userRepository = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUseCase(userRepository)

    const email = 'john.doe@gmail.com'

    await registerUserCase.execute({
      name: 'John Doe',
      email,
      password: '1234994',
    })

    await expect(() =>
      registerUserCase.execute({
        name: 'John Doe',
        email,
        password: '1234994',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    /**
     * lendo essa expect,
     * eu espero que quando essa promisse registerUserCase terminar de execultar
     * ela rejeite e eu quero que o resultado dela seja uma extância da classe
     * user already exists error
     */
  })
})
