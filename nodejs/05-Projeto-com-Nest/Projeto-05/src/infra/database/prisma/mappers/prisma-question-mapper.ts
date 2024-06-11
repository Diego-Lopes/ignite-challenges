import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/forum/enterprise/entites/question'
import { Slug } from '@/domain/forum/enterprise/entites/value-objects/slug'
import { Question as PrismaQuestion } from '@prisma/client'

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Question {
    // recebe question do prisma e retorna question do domain

    return Question.create(
      {
        title: raw.title,
        content: raw.content,
        authorId: new UniqueEntityID(raw.authorId),
        bestAnswerId: raw.bestAnswerId
          ? new UniqueEntityID(raw.bestAnswerId)
          : null, // só gera unique entity id se realmente exister bestAnswerId, caso contrario retorna null
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
