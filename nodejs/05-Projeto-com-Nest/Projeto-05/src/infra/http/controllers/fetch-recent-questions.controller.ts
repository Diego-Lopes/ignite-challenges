import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

// fazendo validação com pipe zod.
const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
/**
 * Para proteger essa rota usamos UseGrards do nestjs
 * e dentro passamos como função AuthGuard de nestjs/passport
 * como parâmetro passamos uma string chamada 'jwt'
 * que faz referência ao jwt.strategy.ts
 */
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) { }

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    // busca os dados do usuário autenticado.
    const parPage = 20
    const questions = await this.prisma.question.findMany({
      take: parPage,
      skip: (page - 1) * parPage, // ele pula o número de registro necessário para mostra na próxima pagina.
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      questions,
    }
  }
}
