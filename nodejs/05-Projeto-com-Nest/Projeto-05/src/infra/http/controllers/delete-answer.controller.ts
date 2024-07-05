import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

@Controller('/answers/:id')
export class DeleteAnswerController {
  constructor(private deleteAnswer: DeleteAnswerUseCase) { }

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string,
  ) {
    // busca os dados do usuário autenticado.
    const userId = user.sub

    // implementando isso não temos mais a depedência do prisma.
    const result = await this.deleteAnswer.execute({
      answerId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
