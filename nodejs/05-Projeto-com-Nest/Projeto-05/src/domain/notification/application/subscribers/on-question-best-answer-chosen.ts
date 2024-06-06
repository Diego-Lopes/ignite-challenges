import { DomainEvents } from '@/core/event/domain-events'
import { EventHandler } from '@/core/event/event-handler'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionBestAnswerChosenEvent } from '@/domain/forum/enterprise/events/question-best-answer-chosen-event'
import { SendNotificationUseCase } from '@/domain/notification/application/use-case/send-notification'

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRespository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      /**
       * usamos .bind() passando this para referênciar o objeto dessa classe.
       * e não referênciar quem está chamando está classe.
       */
      QuestionBestAnswerChosenEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answersRespository.findById(
      bestAnswerId.toString(),
    )

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Sua resposta foi escolhida.`,
        content: `A resposta que você envio em "${question.title.substring(0, 20).concat('...')}" foi escolhida.`,
      })
    }
  }
}
