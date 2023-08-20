import { google } from 'googleapis'
import { prisma } from './prisma'
import dayjs from 'dayjs'

export async function getGoogleOAuthToken(userId: string) {
  /**
   * agora vamos verificar se a conta existe no banco e fazer o refresh token
   */
  const account = await prisma.account.findFirstOrThrow({
    where: {
      provider: 'google',
      user_id: userId,
    },
  })

  /**
   * fazendo comunição com api do google
   * o OAuth2 recebe do parâmetros o client id
   * e client secret
   */
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  )

  /**
   * Agora fazemos o configuração das credenciais com
   * base de dados salvos no banco de dados.
   */
  auth.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: account.expires_at ? account.expires_at * 1000 : null,
  })

  /**
   * validação para ver se o token não está expirado, essa validação é só
   * para account.expires_at para de acusar erro de objeto nulo.
   */
  if (!account.expires_at) {
    return auth
  }

  /**
   * Caso o token esteja expirado vamos criar uma lógica para
   * atualiza o token.
   *
   * dayjs(account.expires_at * 1000) aqui o dayjs lê em milésimos de segundo,
   * por isso multiplicação por mil.
   *
   * se isTokenExpired foi anterior a data atual preciso atualizar o token. Essa
   * é a lógica da variável abaixo.
   */
  const isTokenExpired = dayjs(account.expires_at * 1000).isBefore(new Date())

  if (isTokenExpired) {
    const { credentials } = await auth.refreshAccessToken()
    const {
      access_token,
      expiry_date,
      id_token,
      refresh_token,
      scope,
      token_type,
    } = credentials

    await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        access_token,
        expires_at: expiry_date ? Math.floor(expiry_date / 1000) : null,
        id_token,
        refresh_token,
        scope,
        token_type,
      },
    })

    auth.setCredentials({
      access_token,
      refresh_token,
      expiry_date,
    })
  }

  return auth
}
