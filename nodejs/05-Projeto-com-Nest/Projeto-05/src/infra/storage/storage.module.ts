import { Uploader } from '@/domain/forum/application/storage/uploader'
import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { R2Storage } from './r2-storage'

@Module({
  imports: [EnvModule], // sou obrigado a importar o envModule pois usamos no R2Storage
  providers: [
    {
      provide: Uploader,
      useClass: R2Storage,
    },
  ],
  exports: [Uploader],
})
export class StorageModule { }
