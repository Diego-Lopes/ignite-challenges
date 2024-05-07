import { Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('/questions')
/**
 * Para proteger essa rota usamos UseGrards do nestjs
 * e dentro passamos como função AuthGuard de nestjs/passport
 * como parâmetro passamos uma string chamada 'jwt'
 * que faz referência ao jwt.strategy.ts
 */
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor() { }
  @Post()
  async handle() {
    return 'ok'
  }
}
