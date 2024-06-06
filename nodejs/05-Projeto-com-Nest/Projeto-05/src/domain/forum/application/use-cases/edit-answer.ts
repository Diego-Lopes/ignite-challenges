import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Answer } from '../../enterprise/entites/answer'
import { AnswerAttachment } from '../../enterprise/entites/answer-attachment'
import { AnswerAttachmentList } from '../../enterprise/entites/answer-attachment-list'
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository'
import { AnswersRepository } from '../repositories/answers-repository'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(
    private answerRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    // pesquisando para verificar se existe a pergunda informada para editar.
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }
    // busacando todos os anexos que já tinha antes de editar.
    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    // criando uma lista
    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    // agora vamos criar uma nova lista de anexos,
    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      })
    })

    // agora compara as listas que já tinha anexos e com a nova lista com possíveis novos anexos
    answerAttachmentList.update(answerAttachments)
    // editar uma questão
    await this.answerRepository.save(answer)

    answer.attachments = answerAttachmentList
    answer.content = content

    // editar uma questão
    await this.answerRepository.save(answer)

    return right({
      answer,
    })
  }
}
