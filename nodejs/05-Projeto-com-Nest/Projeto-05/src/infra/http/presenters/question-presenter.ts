import { Question } from '@/domain/forum/enterprise/entities/question'

export class QuestionPresenter {
  static toHTTP(question: Question) {
    return {
      id: question.id.toString(),
      title: question.title,
      slug: question.slug.value,
      bastAnswerId: question.bestAnswerId?.toString,
      createdAt: question.createdAt,
      updateAt: question.updatedAt,
    }
  }
}
