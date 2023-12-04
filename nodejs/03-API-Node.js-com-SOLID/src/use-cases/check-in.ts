/* eslint-disable prettier/prettier */
import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositoreis/check-ins-repository'
import { GymsRepository } from '@/repositoreis/gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxNumberOfCheckInsEror } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-errror'

/**
 * tipagem de entrada e de saída
 */
interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) { }

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

    // verificando a academia
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // se a academia existir precisamos calcular a distância entre o usuário e academia.
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }


    // verificar se existe checkin do mesmo dia
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    )

    // se existe um checkIn no mesmo dia, vamos disparar um erro.
    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsEror()
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
