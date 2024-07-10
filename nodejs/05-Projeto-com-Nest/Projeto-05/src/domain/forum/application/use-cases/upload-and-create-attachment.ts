import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Attachment } from '../../enterprise/entities/attachment'
import { AttachmentsRepository } from '../repositories/attachments-repository'
import { Uploader } from '../storage/uploader'
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type'

interface UploadAndCrateAttachmentUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadAndCrateAttachmentUseCaseResponse = Either<
  InvalidAttachmentTypeError,
  {
    attachment: Attachment
  }
>
@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private attachmentRepository: AttachmentsRepository,
    private uploader: Uploader,
  ) { }

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCrateAttachmentUseCaseRequest): Promise<UploadAndCrateAttachmentUseCaseResponse> {
    // validando file type
    // usando regex
    if (!/^(image\/(jpeg|png))$|^aplication\/pdf$/.test(fileType)) {
      return left(new InvalidAttachmentTypeError(fileType))
    }

    // antes de salvar no banco vamos fazer
    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    // salvando no banco de dados
    const attachment = Attachment.create({
      title: fileName,
      url, // aqui colocar a url válida quando realmente subir para um serviço de storage.
    })

    await this.attachmentRepository.create(attachment)

    return right({ attachment })
  }
}
