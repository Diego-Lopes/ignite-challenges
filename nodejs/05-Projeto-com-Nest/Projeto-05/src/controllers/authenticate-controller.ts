import { Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

// const createAccountBodySchema = z.object({
//   name: z.string(),
//   email: z.string().email(),
//   password: z.string().min(6),
// })

// type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(private jwt: JwtService) { }

  @Post()
  // @HttpCode(201) // podemos forçar um tipo de http code
  // @UsePipes(new ZodValidationPipe(createAccountBodySchema)) // UsePipes é um midelware que intercepta e valida os dados com zod.
  async handle() {
    const token = this.jwt.sign({
      sub: 'Diegones',
    })
    return token
  }
}
