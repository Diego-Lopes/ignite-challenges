/* eslint-disable prettier/prettier */
import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositoreis/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

/**
 * tipagem de entrada e de saída
 */
interface ValidateCheckInUseCaseRequest {
  checkInId: string
}


// aqui não precisamos retornar nada, mas o Diego deixo para retornar algo
interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository
  ) { }

  async execute({
    checkInId
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {

    // buscando nosso check In
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    // verificando se o check-in não está em um intervalo de tempo menor de 20 minutos.
    const distanceInMinutesFromCheckinCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes'
    )

    if (distanceInMinutesFromCheckinCreation > 20) {
      throw new LateCheckInValidationError()
    }

    // caso tenha checkIn vou atualizar validated_at com a data atual.
    checkIn.validated_at = new Date()

    // salvando em memory
    await this.checkInsRepository.save(checkIn)


    return {
      checkIn
    }

  }
}
