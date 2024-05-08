import { Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserPayload } from 'src/auth/jwt.strategy'

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
  async handle(@CurrentUser() user: UserPayload) {
    // busca os dados do usuário autenticado.

    console.log(user.sub)

    return 'ok'
  }
}
