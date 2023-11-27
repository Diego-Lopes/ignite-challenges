// fazendo uma fetch api nativa como baseUrl igual do axios.
import { env } from '@/env'

export function api(path: string, init?: RequestInit) {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
  const apiPrefix = '/api'

  // usando o construtor URL
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, init)
}

// tudo isso acima pode se chamar api wrapper
