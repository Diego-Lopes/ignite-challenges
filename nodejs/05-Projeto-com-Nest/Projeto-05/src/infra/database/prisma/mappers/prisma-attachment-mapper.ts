import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { Prisma } from '@prisma/client'

export class PrismaAttachmentMapper {
  // Criando persistência
  static toPrisma(
    attachment: Attachment,
  ): Prisma.AttachmentUncheckedCreateInput {
    /**
     * Como estamos passando a nível de domínio da entidade,
     * agora precisamos reverter o processo para nível de banco prisma(persistência).
     */
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }
}
