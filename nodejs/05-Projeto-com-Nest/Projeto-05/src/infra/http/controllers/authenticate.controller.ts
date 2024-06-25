import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) { }

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema)) // UsePipes é um midelware que intercepta e valida os dados com zod.
  async handle(@Body() body: AuthenticateBodySchema) {
    // chamando o body e tipando.
    const { email, password } = body
    console.log({ email })

    const result = await this.authenticateStudent.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      throw new Error()
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken, // diz o diego que fica mais legalzinho no frontend kkk
    }
  }
}
