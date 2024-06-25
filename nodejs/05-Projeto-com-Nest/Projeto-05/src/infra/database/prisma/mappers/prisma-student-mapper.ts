import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Student } from '@/domain/forum/enterprise/entities/student'
import { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaStudentMapper {
  static toDomain(raw: PrismaUser): Student {
    // recebe question do prisma e retorna question do domain

    return Student.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    )
  }

  // Criando persistência
  static toPrisma(student: Student): Prisma.UserUncheckedCreateInput {
    /**
     * Como estamos passando a nível de domínio da entidade,
     * agora precisamos reverter o processo para nível de banco prisma(persistência).
     */
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
    }
  }
}
