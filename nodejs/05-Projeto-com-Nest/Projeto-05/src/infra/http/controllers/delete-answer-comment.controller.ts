import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

@Controller('/answers/comments/:id')
export class DeleteAnswerCommentController {
  constructor(private deleteAnswerComment: DeleteAnswerCommentUseCase) { }

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') answerCommentId: string,
  ) {
    // busca os dados do usuário autenticado.
    const userId = user.sub

    // implementando isso não temos mais a depedência do prisma.
    const result = await this.deleteAnswerComment.execute({
      answerCommentId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
