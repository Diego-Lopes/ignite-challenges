import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositoreis/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositoreis/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsEror } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-errror'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    // executa antes dos testes, recriando variáveis em memória.
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    // criando academia
    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -27.2092052,
      longitude: -49.601091,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -49.601091,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in twice in the same day', async () => {
    // tentar fazer o 1 check-in
    vi.setSystemTime(new Date(2023, 10, 30, 12, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -49.601091,
    })

    expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -27.2092052,
        userLongitude: -49.601091,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsEror)
  })

  it('Should not be able to check in twice but in different days', async () => {
    // tentar fazer o 1 check-in
    vi.setSystemTime(new Date(2023, 11, 30, 12, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -49.601091,
    })

    vi.setSystemTime(new Date(2023, 12, 1, 12, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -49.601091,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})

it('Should not be able check in on distant gym', async () => {
  // criando nova academia
  gymsRepository.items.push({
    id: 'gym-02',
    title: 'JavaScript Gym',
    description: '',
    phone: '',
    latitude: new Decimal(-27.0747279),
    longitude: new Decimal(-49.4889672),
  })

  await expect(() =>
    sut.execute({
      gymId: 'gym-02',
      userId: 'user-01',
      userLatitude: -27.2092052,
      userLongitude: -49.601091,
    }),
  ).rejects.toBeInstanceOf(MaxDistanceError)
})
