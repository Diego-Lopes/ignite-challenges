import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { QuestionCommentFactory } from 'test/factories/make-question-comment'
import { QuestionFactory } from 'test/factories/make-questions'
import { StudentFactory } from 'test/factories/make-student'

describe('Delete question comment (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let questionCommentFactory: QuestionCommentFactory
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
      providers: [StudentFactory, QuestionFactory, QuestionCommentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    questionCommentFactory = moduleRef.get(QuestionCommentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE] /questions/comments/:id', async () => {
    // antes de fazer a pergunta preciso está autenticado e antes de autenticar
    // preciso criar um conta.
    // criando uma conta.
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const questionComment =
      await questionCommentFactory.makePrismaQuestionComment({
        authorId: user.id,
        questionId: question.id,
      })

    // pegando id da pergunta
    const questionCommentId = questionComment.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/questions/comments/${questionCommentId}`)
      .set('Authorization', `Bearer ${accessToken}`) // set insere um valor no cabeçalho
      .send()

    expect(response.statusCode).toBe(204)

    // verificando se foi deletado no banco de dados.
    const commentOnDatabase = await prisma.comment.findUnique({
      where: {
        id: questionCommentId,
      },
    })

    expect(commentOnDatabase).toBeNull() // toBeNull para verificar que foi excluído.
  })
})
