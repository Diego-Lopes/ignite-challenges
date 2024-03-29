/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryNotificationsRepository } from 'test/repository/in-memory-notifications-repository'
import { SendNotificationUseCase } from './send-notification'

// automatizando a criação
let inMemoryNotificationRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    // instanciando repositorio.
    inMemoryNotificationRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  /**
   * SUT
   * Significa System Under Test
   */

  it('should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'Nova notificação',
      content: 'Conteúdo da notificação.',
    })

    // toBeTruthy quer dizer que o objeto não pode ser null ou underfined
    // expect(result.recipientId).toBeTruthy()

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
