/* eslint-disable prettier/prettier */
import { UsersRepository } from '@/repositoreis/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

/**
 * tipagem de entrada e de saída
 */
interface AuthenticatUseCaseRequest {
  // caso dê sucesso, o que vou devolver para usuário?
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    email,
    password,
  }: AuthenticatUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    // auth
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    // se o email é valido, agora vamos validar a senha.
    const doesPasswordMatches = await compare(password, user.password_hash)
    // compare de bcrypt compara com a senha recebida com a senha salva no banco no formato hash

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    // caso o hash seja igual ele retorna o usuário.
    return {
      user,
    }
  }
}
