/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entites/answer'
import { QuestionRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entites/question'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionRepository: QuestionRepository = {
  create: async function (question: Question): Promise<void> { },
}

test('Create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'Nova pergunta',
    content: 'Conteúdo da pergunta.',
  })

  // toBeTruthy quer dizer que o objeto não pode ser null ou underfined
  expect(question.id).toBeTruthy()
})
