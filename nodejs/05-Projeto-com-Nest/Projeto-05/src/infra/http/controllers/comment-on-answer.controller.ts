import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'
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

const commentOnAnswerBodySchema = z.object({
  content: z.string(),
})

type CommentOnAnswerBodySchema = z.infer<typeof commentOnAnswerBodySchema>

@Controller('/answers/:answerId/comments')
export class CommentOnAnswerController {
  constructor(private commentOnAnswer: CommentOnAnswerUseCase) { }

  @Post()
  async handle(
    @Body(new ZodValidationPipe(commentOnAnswerBodySchema))
    body: CommentOnAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('answerId') answerId: string,
  ) {
    // busca os dados do usuário autenticado.
    const { content } = body
    const userId = user.sub

    // implementando isso não temos mais a depedência do prisma.
    const result = await this.commentOnAnswer.execute({
      content,
      answerId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
