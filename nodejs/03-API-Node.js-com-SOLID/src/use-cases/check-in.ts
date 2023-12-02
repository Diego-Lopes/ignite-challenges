/* eslint-disable prettier/prettier */
import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositoreis/check-ins-repository'

/**
 * tipagem de entrada e de saída
 */
interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) { }

  async execute({
    userId,
    gymId
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

    // verificar se existe checkin do mesmo dia
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    )

    // se existe um checkIn no mesmo dia, vamos disparar um erro.
    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    })


    return {
      checkIn,
    }
  }
}
