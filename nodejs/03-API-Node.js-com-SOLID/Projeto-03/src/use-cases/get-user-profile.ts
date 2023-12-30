/* eslint-disable prettier/prettier */
import { UsersRepository } from '@/repositoreis/users-repository'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

/**
 * esse use case é básicamento retornar o perfil de um usuário
 */


/**
 * tipagem de entrada e de saída
 */
interface GetUserProfileUseCaseRequest {
  // vamos receber só id dele.
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    userId
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    // retornando o usuário.
    return {
      user,
    }
  }
}
