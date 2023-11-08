import { UsersRepository } from '@/repositoreis/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterUserCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUserCaseResponse {
  user: User
}

// Implementation SOLID

// D - Dependency inversion Principle
export class RegisterUseCase {
  // o construtor onde podemos inserir as dependencias.
  // eslint-disable-next-line prettier/prettier
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    name,
    email,
    password,
  }: RegisterUserCaseRequest): Promise<RegisterUserCaseResponse> {
    const password_hash = await hash(password, 6)
    /**
     * hash("", round)
     * 1 parâmetro temos nosso valor da password
     * 2 parâmetro temos nosso round que nada mais é que pegar o valor do 1 round
     * e concatenar com segundo round quando for chamado novamente e assim
     * até chegar ao limite que é 6 como acima.
     */

    // validar se há email existente
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    // created user
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
