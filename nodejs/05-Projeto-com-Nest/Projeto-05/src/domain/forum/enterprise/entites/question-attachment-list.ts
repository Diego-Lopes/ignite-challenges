import { WatchedList } from '@/core/entities/watched-list'
import { QuestionAttachment } from './question-attachment'

export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
  compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
    // serve para comparar se os ids são iguais ou não para identificar e saber onde colocar.
    return a.attachmentId.equals(b.attachmentId)
  }
}
