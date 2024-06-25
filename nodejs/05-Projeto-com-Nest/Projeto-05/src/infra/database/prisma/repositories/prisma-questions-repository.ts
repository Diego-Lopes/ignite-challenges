import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) { }

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: { id },
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: { slug },
    })

    if (!question) {
      return null
    }
    return PrismaQuestionMapper.toDomain(question)
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    // fazendo a busca por mais recente e paginando.
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20, // pega 20
      skip: (page - 1) * 20, // faz paginação pegando em 0, 20, 40...
    })

    // rakezinho do diegão
    /**
     * como map recebe uma função e PrismaQuestionMapper.toDomian é uma função
     * é só atribuir ao map que vai funcionar.
     */
    return questions.map(PrismaQuestionMapper.toDomain)
  }

  async save(question: Question): Promise<void> {
    /**
     * Como estamos passando a nível de domínio da entidade,
     * agora precisamos reverter o processo para nível de banco prisma(persistência).
     * vamos criar no mapper esse inversão de valores
     */
    const data = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(question: Question): Promise<void> {
    /**
     * Como estamos passando a nível de domínio da entidade,
     * agora precisamos reverter o processo para nível de banco prisma(persistência).
     * vamos criar no mapper esse inversão de valores
     */
    const data = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.delete({
      where: {
        id: data.id,
      },
    })
  }

  async create(question: Question): Promise<void> {
    /**
     * Como estamos passando a nível de domínio da entidade,
     * agora precisamos reverter o processo para nível de banco prisma(persistência).
     * vamos criar no mapper esse inversão de valores
     */
    const data = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.create({
      data,
    })
  }
}
