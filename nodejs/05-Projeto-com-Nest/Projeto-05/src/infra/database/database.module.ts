import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAnswersAttachmentsRepository } from './prisma/repositories/prisma-answer-attchaments-respository'
import { PrismaAnswersCommentsRepository } from './prisma/repositories/prisma-answer-comments-respository'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository'
import { PrismaQuestionsAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaQuestionsCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
      /**
       * esse objeto faz uma refeência onde estiver chamando a classe abstrata QuestionRepository
       * substitua a referência para PrismaQuestionRepository
       */
    },
    PrismaQuestionsCommentsRepository,
    PrismaQuestionsAttachmentsRepository,
    PrismaAnswersAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswersCommentsRepository,
    PrismaAnswersAttachmentsRepository,
  ], // aqui só está visivel dentro do módulo DatabaseModule.
  exports: [
    PrismaService,
    QuestionsRepository,
    PrismaQuestionsCommentsRepository,
    PrismaQuestionsAttachmentsRepository,
    PrismaAnswersAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswersCommentsRepository,
    PrismaAnswersAttachmentsRepository,
  ], // todo módulo exportar DataBaseModule terá acesso ao prisma service.
})
export class DatabaseModule { }
