// validar as variáveis de ambiente.
// import { z } from 'zod'

// const envSchema = z.object({
//   NEXT_PUBLIC_API_BASE_URL: z.string().url(),
//   APP_URL: z.string().url(),
// })

// const parsedEnv = envSchema.safeParse(process.env)

// if (!parsedEnv.success) {
//   console.error(
//     'Invalid environment variable',
//     parsedEnv.error.flatten().fieldErrors,
//   )

//   throw new Error('Invalid enviroment variable.')
// }

// export const env = parsedEnv.data

// src/env.mjs

import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    APP_URL: z.string().url(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
})
