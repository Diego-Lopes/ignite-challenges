/* eslint-disable @typescript-eslint/no-unused-vars */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeNotification } from 'test/factories/make-notification'
import { InMemoryNotificationsRepository } from 'test/repository/in-memory-notifications-repository'
import { ReadNotificationUseCase } from './read-notification'

// automatizando a criação
let inMemoryNotificationRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    // instanciando repositorio.
    inMemoryNotificationRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationRepository)
  })

  /**
   * SUT
   * Significa System Under Test
   */

  it('should be able to read a notification', async () => {
    const notification = makeNotification()

    inMemoryNotificationRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    // toBeTruthy quer dizer que o objeto não pode ser null ou underfined
    // expect(result.recipientId).toBeTruthy()

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items[0].readAt).toEqual(
      // Espero que seja igual a qualquer data.
      expect.any(Date),
    )
  })

  it(`should not be able to read a notification from another user`, async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID('recipient-1'),
    })

    await inMemoryNotificationRepository.create(notification)

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: 'recipient-2',
    })

    expect(result.isLeft()).toBe(true)

    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
