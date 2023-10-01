import { config } from 'dotenv'
import { z } from 'zod'

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

// fazendo tratativa de erro com zod
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
  // coerce faz uma conversão.
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables.')
}

export const env = _env.data
