import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const commentOnQuestionBodySchema = z.object({
  content: z.string(),
})

type CommentOnQuestionBodySchema = z.infer<typeof commentOnQuestionBodySchema>

@Controller('/questions/:questionId/comments')
export class CommentOnQuestionController {
  constructor(private commentOnQuestion: CommentOnQuestionUseCase) { }

  @Post()
  async handle(
    @Body(new ZodValidationPipe(commentOnQuestionBodySchema))
    body: CommentOnQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
  ) {
    // busca os dados do usuário autenticado.
    const { content } = body
    const userId = user.sub

    // implementando isso não temos mais a depedência do prisma.
    const result = await this.commentOnQuestion.execute({
      content,
      questionId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
