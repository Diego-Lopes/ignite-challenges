import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) { }
  @Post()
  @HttpCode(201) // podemos forçar um tipo de http code
  async handle(@Body() body: any) {
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
