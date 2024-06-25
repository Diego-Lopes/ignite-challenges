import { StudentAlreadyExistsError } from '@/domain/forum/application/use-cases/errors/student-already-exists-error'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private registerStudent: RegisterStudentUseCase) { }

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

    const result = await this.registerStudent.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      /**
       * Fazendo tratavida de erros.
       * vamos pegar o erro que retorna do result.value
       * depois vamos verificar o tipo de erro com error.constructor
       */
      const error = result.value

      switch (error.constructor) {
        case StudentAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
