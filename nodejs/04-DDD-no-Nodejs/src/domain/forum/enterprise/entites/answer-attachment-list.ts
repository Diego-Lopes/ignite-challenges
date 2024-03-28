import { WatchedList } from '@/core/entities/watched-list'
import { AnswerAttachment } from './answer-attachment'

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
  compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    // serve para comparar se os ids são iguais ou não para identificar e saber onde colocar.
    return a.attachmentId === b.attachmentId
  }
}
