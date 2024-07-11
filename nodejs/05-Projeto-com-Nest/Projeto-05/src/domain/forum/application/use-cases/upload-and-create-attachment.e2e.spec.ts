/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryAttachmentsRepository } from 'test/repository/in-memory-attachments-repository'
import { FakeUploader } from 'test/storage/fake-uploader'
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type'
import { UploadAndCreateAttachmentUseCase } from './upload-and-create-attachment'

// automatizando a criação
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let fakeUploader: FakeUploader
let sut: UploadAndCreateAttachmentUseCase

describe('Upload and create attachment', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    fakeUploader = new FakeUploader()
    sut = new UploadAndCreateAttachmentUseCase(
      inMemoryAttachmentsRepository,
      fakeUploader,
    )
  })

  it('should be able to upload and create an attachment', async () => {
    const result = await sut.execute({
      fileName: 'profile.png',
      fileType: 'image/png',
      body: Buffer.from('any buffer'),
    })

    expect(result.isRight()).toBe(true) // espero um resultado de sucesso.
    expect(result.value).toEqual({
      attachment: inMemoryAttachmentsRepository.items[0],
    }) // espero que o valor de result seja igual ao item criado.

    // espero que no fakeUpload tenha um arquivo
    expect(fakeUploader.uploads).toHaveLength(1)
    // espero que dentro do array primeiro item tenha o nome profile.png
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'profile.png',
      }),
    )
  })

  it('should not be able to upload an attachment with invalid file type', async () => {
    const result = await sut.execute({
      fileName: 'profile.mp3',
      fileType: 'audio/mpeg',
      body: Buffer.from('any buffer'),
    })

    expect(result.isLeft()).toBe(true) // espero um resultado de sucesso.
    expect(result.value).toBeInstanceOf(InvalidAttachmentTypeError) // espero que o valor de result seja igual ao item criado.
  })
})
