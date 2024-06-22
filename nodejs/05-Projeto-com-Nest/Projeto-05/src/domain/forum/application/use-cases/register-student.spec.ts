/* eslint-disable @typescript-eslint/no-unused-vars */
import { FakerHasher } from 'test/crytography/fake-hasher'
import { InMemoryStudentsRepository } from 'test/repository/in-memory-students-repository'
import { RegisterStudentUseCase } from './register-student'

// automatizando a criação
let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakerHasher: FakerHasher
let sut: RegisterStudentUseCase

describe('Register Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    // instanciando repositorio.
    fakerHasher = new FakerHasher()
    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakerHasher)
  })

  it('should be able to register a new student', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'joedoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true) // espero um resultado de sucesso.
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0],
    }) // espero que o valor de result seja igual ao item criado.
  })

  it('should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'joedoe@example.com',
      password: '123456',
    })

    const hashedPassword = await fakerHasher.hash('123456')

    expect(result.isRight()).toBe(true) // espero um resultado de sucesso.
    expect(inMemoryStudentsRepository.items[0].password).toEqual(hashedPassword)
  })
})
