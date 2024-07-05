import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
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

const answerQuestionBodySchema = z.object({
  content: z.string(),
})

type AnswerQuestionBodySchema = z.infer<typeof answerQuestionBodySchema>

@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
  constructor(private answerQuestion: AnswerQuestionUseCase) { }

  @Post()
  async handle(
    @Body(new ZodValidationPipe(answerQuestionBodySchema))
    body: AnswerQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
  ) {
    // busca os dados do usuário autenticado.
    const { content } = body
    const userId = user.sub

    // implementando isso não temos mais a depedência do prisma.
    const result = await this.answerQuestion.execute({
      content,
      questionId,
      authorId: userId,
      attachmentsIds: [],
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
