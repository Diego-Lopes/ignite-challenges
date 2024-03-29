import { NotificationsRepository } from '@/domain/notification/application/repositories/notification-repositories'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository
  implements NotificationsRepository {
  // uma variável que vai armazenar um array de notificação
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)
  }
}
