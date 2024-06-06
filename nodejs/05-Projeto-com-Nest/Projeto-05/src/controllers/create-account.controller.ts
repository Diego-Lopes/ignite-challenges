import { PrismaService } from '@/prisma/prisma.service'
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { z } from 'zod'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201) // podemos forçar um tipo de http code
  @UsePipes(new ZodValidationPipe(createAccountBodySchema)) // UsePipes é um midelware que intercepta e valida os dados com zod.
  async handle(@Body() body: CreateAccountBodySchema) {
    /**
     * para chamar os parâmetros de req, no nest usamod decorations
     * como queremos body da requisição usamos @Body logo em seguida
     * passamos o resultado de @body para uma variável e podemos tipar essa variável.
     */

    const { name, email, password } = body

    const hashedPassword = await hash(password, 8)

    const data = {
      name,
      email,
      password: hashedPassword,
    }

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with same e-mail address already exists.',
      )
    }

    await this.prisma.user.create({
      data,
    })
  }
}
