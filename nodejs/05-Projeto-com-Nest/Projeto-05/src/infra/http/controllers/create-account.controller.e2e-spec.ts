import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create account (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  /**
   * Para fazer um test e2e precisamos subir a aplicação, para fazer isso
   * sem realmente subir, usamos createTestingModule de nestjs
   * para isso vamos usar também supertest para fazer a requisições.
   * e salvamos isso na variável app logo acima.
   */
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'John Smith',
      email: 'john@smith.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)

    // garantindo que foi salvo no banco de dados.
    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'john@smith.com',
      },
    })

    expect(userOnDatabase).toBeTruthy() // toBeTruthy valida se é um retorno válido como boolean, e dar erro se vier unknown ou undefined.
  })
})
