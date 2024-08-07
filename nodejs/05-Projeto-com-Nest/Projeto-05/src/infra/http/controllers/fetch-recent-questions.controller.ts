import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import {
  BadRequestException,
  Controller,
  Get,
  Query
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { QuestionPresenter } from '../presenters/question-presenter'

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
// @UseGuards(JwtAuthGuard)
/**
 * AGORA NÃO PRECISA MAIS COLOCAR O USEGUARDS, DENTRO DO MÓDULO DE AUTH
 * COLOCAMOS TODAS AS ROTAS AUTENTICADA E AGORA DIZEMOS QUAIS ROTAS
 * NÃO PRECISA DE AUTENTICAÇÃO
 */
export class FetchRecentQuestionsController {
  constructor(private fetchRecentQuestions: FetchRecentQuestionsUseCase) { }

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchRecentQuestions.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const questions = result.value.questions

    return {
      questions: questions.map(QuestionPresenter.toHTTP),
    }
  }
}
