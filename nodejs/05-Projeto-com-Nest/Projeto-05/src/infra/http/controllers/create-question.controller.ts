import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Body,
  Controller,
  Post
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
/**
 * Para proteger essa rota usamos UseGrards do nestjs
 * e dentro passamos como função AuthGuard de nestjs/passport
 * como parâmetro passamos uma string chamada 'jwt'
 * que faz referência ao jwt.strategy.ts
 */
// @UseGuards(JwtAuthGuard)
/**
 * AGORA NÃO PRECISA MAIS COLOCAR O USEGUARDS, DENTRO DO MÓDULO DE AUTH
 * COLOCAMOS TODAS AS ROTAS AUTENTICADA E AGORA DIZEMOS QUAIS ROTAS
 * NÃO PRECISA DE AUTENTICAÇÃO
 */
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) { }

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createQuestionBodySchema))
    body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    // busca os dados do usuário autenticado.
    const { title, content } = body
    const userId = user.sub

    // implementando isso não temos mais a depedência do prisma.
    const result = await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: [],
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
  //   const slug = this.convertToSlug(title)
  //   await this.prisma.question.create({
  //     data: {
  //       authorId: userId,
  //       title,
  //       content,
  //       slug,
  //     },
  //   })
  // }

  // private convertToSlug(title: string): string {
  //   return title
  //     .toLowerCase()
  //     .normalize('NFC')
  //     .replace(/[\u0300-\u036f]/g, '')
  //     .replace(/[^\w\s-]/g, '')
  //     .replace(/\s+/g, '-')
  // }
}
