import { DomainEvents } from '@/core/event/domain-events'
import { EventHandler } from '@/core/event/event-handler'
import { AnswerCreatedEvent } from '../../enterprise/events/answer-created-event'

export class OnAnswerCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      /**
       * usamos .bind() passando this para referênciar o objeto dessa classe.
       * e não referênciar quem está chamando está classe.
       */
      AnswerCreatedEvent.name,
    )
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    console.log(answer)
  }
}
