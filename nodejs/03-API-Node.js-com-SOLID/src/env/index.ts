import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333), // coerce ele converte um valor para determinado formato que definir.
})

const _env = envSchema.safeParse(process.env) // esse safeParse vai validar se tem essas informações dentro de process.env

if (_env.success === false) {
  console.error('❌ invalid environment variable:', _env.error.format())

  throw new Error('Invalid environment variable.')
}

export const env = _env.data
