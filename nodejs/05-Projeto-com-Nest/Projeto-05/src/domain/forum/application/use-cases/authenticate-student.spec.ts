import { FakeEncrypter } from 'test/crytography/fake-encrypter'
import { FakerHasher } from 'test/crytography/fake-hasher'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryStudentsRepository } from 'test/repository/in-memory-students-repository'
import { AuthenticateStudentUseCase } from './authenticate-student'

// automatizando a criação
let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakerHasher: FakerHasher
let fakerEncrypter: FakeEncrypter

let sut: AuthenticateStudentUseCase

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    // instanciando repositorio.
    fakerHasher = new FakerHasher()
    fakerEncrypter = new FakeEncrypter()
    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakerHasher,
      fakerEncrypter,
    )
  })

  it('should be able to authenticate a student', async () => {
    // criando o estudante
    const student = makeStudent({
      email: 'joedoe@example.com',
      password: await fakerHasher.hash('123456'),
    })

    // salvando no repositório
    inMemoryStudentsRepository.items.push(student)

    const result = await sut.execute({
      email: 'joedoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true) // espero um resultado de sucesso.
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    }) // espero que o accessToken seja qualquer string.
  })
})
