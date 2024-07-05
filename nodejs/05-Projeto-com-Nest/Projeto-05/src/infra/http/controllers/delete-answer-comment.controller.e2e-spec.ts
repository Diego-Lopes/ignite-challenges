import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerCommentFactory } from 'test/factories/make-answer-comment'
import { AnswerFactory } from 'test/factories/make-answers'
import { QuestionFactory } from 'test/factories/make-questions'
import { StudentFactory } from 'test/factories/make-student'

describe('Delete answer comment (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let studentFactory: StudentFactory
  let answerFactory: AnswerFactory
  let answerCommentFactory: AnswerCommentFactory
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
      providers: [
        StudentFactory,
        QuestionFactory,
        AnswerFactory,
        AnswerCommentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    answerCommentFactory = moduleRef.get(AnswerCommentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE] /answers/comments/:id', async () => {
    // antes de fazer a pergunta preciso está autenticado e antes de autenticar
    // preciso criar um conta.
    // criando uma conta.
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const answer = await answerFactory.makePrismaAnswer({
      questionId: question.id,
      authorId: user.id,
    })

    const answerComment = await answerCommentFactory.makePrismaAnswerComment({
      answerId: answer.id,
      authorId: user.id,
    })

    // pegando id da pergunta
    const answerCommentId = answerComment.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/answers/comments/${answerCommentId}`)
      .set('Authorization', `Bearer ${accessToken}`) // set insere um valor no cabeçalho
      .send()

    expect(response.statusCode).toBe(204)

    // verificando se foi deletado no banco de dados.
    const commentOnDatabase = await prisma.comment.findUnique({
      where: {
        id: answerCommentId,
      },
    })

    expect(commentOnDatabase).toBeNull() // toBeNull para verificar que foi excluído.
  })
})
