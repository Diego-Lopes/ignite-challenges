import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionFactory } from 'test/factories/make-questions'
import { StudentFactory } from 'test/factories/make-student'

describe('Answer question (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let jwt: JwtService
  /**
   * Para fazer um test e2e precisamos subir a aplicação, para fazer isso
   * sem realmente subir, usamos createTestingModule de nestjs
   * para isso vamos usar também supertest para fazer a requisições.
   * e salvamos isso na variável app logo acima.
   */
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /questions/:questionId/answers', async () => {
    // antes de fazer a pergunta preciso está autenticado e antes de autenticar
    // preciso criar um conta.
    // criando uma conta.
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    // pegando id da pergunta
    const questionId = question.id.toString()

    const response = await request(app.getHttpServer())
      .post(`/questions/${questionId}/answers`)
      .set('Authorization', `Bearer ${accessToken}`) // set insere um valor no cabeçalho
      .send({
        content: 'New answer',
      })

    expect(response.statusCode).toBe(201)

    // garantindo que foi salvo no banco de dados.
    const answerOnDatabase = await prisma.answer.findFirst({
      where: {
        content: 'New answer',
      },
    })

    expect(answerOnDatabase).toBeTruthy() // toBeTruthy valida se é um retorno válido como boolean, e dar erro se vier unknown ou undefined.
  })
})
