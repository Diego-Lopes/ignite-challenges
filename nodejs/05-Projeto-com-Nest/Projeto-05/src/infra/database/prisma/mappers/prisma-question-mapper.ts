import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { Prisma, Question as PrismaQuestion } from '@prisma/client'

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

  // Criando persistência
  static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput {
    /**
     * Como estamos passando a nível de domínio da entidade,
     * agora precisamos reverter o processo para nível de banco prisma(persistência).
     */
    return {
      id: question.id.toString(),
      authorId: question.authorId.toString(),
      bestAnswerId: question.bestAnswerId?.toString(),
      title: question.title,
      content: question.content,
      slug: question.slug.value,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
