import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { StudentsRepository } from '../repositories/students-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

type AuthenticateStudentUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>
@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentsRespository: StudentsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter, // para gerar o accessToken
  ) { }

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentsRespository.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialsError())
    }
    const isPasswordValid = await this.hashComparer.compare(
      password,
      student.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    // gerando o accessToken
    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    })

    return right({ accessToken })
  }
}
