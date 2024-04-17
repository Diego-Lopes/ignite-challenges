import { DomainEvents } from '@/core/event/domain-events'
import { EventHandler } from '@/core/event/event-handler'
import { SendNotificationUseCase } from '@/domain/notification/application/use-case/send-notification'
import { AnswerCreatedEvent } from '../../enterprise/events/answer-created-event'
import { QuestionsRepository } from '../repositories/question-repository'

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
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
    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Nova resposta em ${question.title.substring(0, 40).concat('...')}`,
        content: answer.excerpt,
      })
    }
  }
}
