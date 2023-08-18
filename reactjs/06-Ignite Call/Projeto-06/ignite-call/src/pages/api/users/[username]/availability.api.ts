import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // obrigando somento um método de busca do tipo GET
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)
  const { date } = req.query

  if (!date) {
    return res.status(400).json({ message: 'Date not provided.' })
  }

  // buscando usuário no banco de dados
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    res.status(404).json({ message: 'User does not exist.' })
  }

  const referenceDate = dayjs(String(date))

  // validando se a data não é do passado
  const isPastDate = referenceDate.endOf('day').isBefore(new Date())

  if (isPastDate) {
    return res.json({ possibleTimes: [], availableTimes: [] })
  }

  // fazer cross com tabela userTimeIntervals e Schedulings
  /**
   * 1 pegando as disponibilidade do usuário
   */
  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: String(user?.id),
      week_day: referenceDate.get('day'),
    },
  })

  // verificando se existe horario disponível
  if (!userAvailability) {
    return res.json({ possibleTimes: [], availableTimes: [] })
  }

  // caso haja horário vamos transformar datatime em horas
  const { time_end_in_minutes, time_start_in_minutes } = userAvailability

  /**
   * aqui temos que tomar mais cuidado pois a converção é em inteiros
   * caso em um futuro queremos marcar por minutos devemos adaptar essas variaveis
   */
  const startHour = time_start_in_minutes / 60
  const endHour = time_end_in_minutes / 60

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, i) => {
      return startHour + i
    },
  )
  // console.log(possibleTimes)

  /**
   * criar uma logica que busta todos os agendamentos marcados por quaisquer usuários
   * e validar o horário disponivel.
   * gte: greater than or equal to
   * lte: less than or equal to
   */
  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: String(user?.id),
      date: {
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endHour).toDate(),
      },
    },
  })

  console.log({ blockedTimes })

  /**
   * criando lógica de determar quais horarios está disponível
   *
   * availableTimes vai fazer
   * vai passar por cada elemento do array de blockedTimes validando que não
   * existe nenhum registro de blockedTimes na tebela scheduling
   * com a hora do agendamento.
   */
  const availableTimes = possibleTimes.filter((time) => {
    return !blockedTimes.some(
      (blockTimes) => blockTimes.date.getHours() === time,
    )
  })

  return res.json({ possibleTimes, availableTimes })
}
