import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { google } from 'googleapis'
import { getGoogleOAuthToken } from '@/lib/google'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // obrigando somento um método de busca do tipo GET
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const username = String(req.query.username)

  // buscando usuário no banco de dados
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(404).json({ message: 'User does not exist.' })
  }

  /**
   * criando validação com zod
   * .datetime() consegue fazer a validação de data.
   */
  const createSchedulingBody = z.object({
    name: z.string(),
    email: z.string().email(),
    observations: z.string(),
    date: z.string().datetime(),
  })
  const { name, email, observations, date } = createSchedulingBody.parse(
    req.body,
  )

  /**
   * .startOf('hour') faz com que a hora seja sempre um número redondo ou inteiro,
   * zera os minutos.
   */
  const schedulingDate = dayjs(date).startOf('hour')

  /**
   * primeira validação
   * verificar se a hora não passou
   */
  if (schedulingDate.isBefore(new Date())) {
    return res.status(400).json({
      message: 'Date is in the past.',
    })
  }

  /**
   * segunda validação
   * verificar se não tem scheduling confirmada
   */
  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling) {
    return res.status(400).json({
      message: 'There is another scheduled at the same time.',
    })
  }

  /**
   * depois dessa verificaçõe se tudo der certo
   * salvar no banco de dados
   */
  const scheduling = await prisma.scheduling.create({
    data: {
      name,
      email,
      observations,
      date: schedulingDate.toDate(),
      user_id: user.id,
    },
  })

  /**
   * criando um acesso ao token de api do calendário google
   */
  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(user.id),
  })

  /**
   * feito o acesso agora vamos fazer a inserção de agendamento
   * calendarId: é para pegar o calendario que a pessoa criou um personalizado
   * como o nome por exemplo ignitecall ou outro que seja.
   * o primary ele pega o default do google calendar
   *
   * requestBody: enviar todas as informações do evento em si.
   *
   * attendees: o convidado que é aquele que está agendando.
   *
   * conferenceData: fazer conferencia de vídeo chamada com google meet
   */
  await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Ignite Call: ${name}`,
      description: observations,
      start: {
        dateTime: schedulingDate.format(),
      },
      end: {
        dateTime: schedulingDate.add(1, 'hour').format(),
      },
      attendees: [
        {
          email,
          displayName: name,
        },
      ],
      conferenceData: {
        createRequest: {
          requestId: scheduling.id,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    },
  })

  return res.status(201).end()
}
