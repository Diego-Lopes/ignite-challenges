import { InMemoryGymsRepository } from '@/repositoreis/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    // executa antes dos testes, recriando variáveis em memória.
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('Should be able to search for gyms', async () => {
    // fazendo um fake check-in
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: '32568512',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: '32568512',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    // para validar o historico tem que efetuar um login
    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })
  it('Should be able to fetch paginated gym search', async () => {
    // criando  paginação com limitador.
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: '32568512',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
    }

    // para validar o historico tem que efetuar um login
    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
