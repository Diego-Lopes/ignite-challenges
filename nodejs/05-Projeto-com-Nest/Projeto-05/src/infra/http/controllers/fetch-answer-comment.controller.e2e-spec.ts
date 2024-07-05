import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerCommentFactory } from 'test/factories/make-answer-comment'
import { AnswerFactory } from 'test/factories/make-answers'
import { QuestionFactory } from 'test/factories/make-questions'
import { StudentFactory } from 'test/factories/make-student'

describe('Fetch answer comments (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let answerFactory: AnswerFactory
  let answerCommentFactory: AnswerCommentFactory
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

    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    answerFactory = moduleRef.get(AnswerFactory)
    answerCommentFactory = moduleRef.get(AnswerCommentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /answer/:answerId/comments', async () => {
    const user = await studentFactory.makePrismaStudent()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const answer = await answerFactory.makePrismaAnswer({
      questionId: question.id,
      authorId: user.id,
    })

    await Promise.all([
      answerCommentFactory.makePrismaAnswerComment({
        authorId: user.id,
        answerId: answer.id,
        content: 'Comment 01',
      }),
      answerCommentFactory.makePrismaAnswerComment({
        authorId: user.id,
        answerId: answer.id,
        content: 'Comment 02',
      }),
    ])

    // pegando o id da questão
    const answerId = answer.id.toString()

    const response = await request(app.getHttpServer())
      .get(`/answers/${answerId}/comments`)
      .set('Authorization', `Bearer ${accessToken}`) // set insere um valor no cabeçalho
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      comments: expect.arrayContaining([
        expect.objectContaining({ content: 'Comment 01' }),
        expect.objectContaining({ content: 'Comment 02' }),
      ]),
    })
  })
})
