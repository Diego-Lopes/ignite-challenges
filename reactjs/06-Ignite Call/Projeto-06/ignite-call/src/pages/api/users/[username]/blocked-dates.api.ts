import { prisma } from '@/lib/prisma'
// import dayjs from 'dayjs'
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
  const { year, month } = req.query

  if (!year || !month) {
    return res.status(400).json({ message: 'Year or month not specified.' })
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

  /**
   * Fazendo consulta de disponibilidade na semana.
   */
  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: String(user?.id),
    },
  })

  /**
   * Vazendo verificação de dias na semana que não há expediente para agendamento.
   */
  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    // retornando os que não tem disponibilidade
    return !availableWeekDays.some(
      (availableWeekDay) => availableWeekDay.week_day === weekDay,
    )
  })

  // retornar os dias que não tem vaga ou não disponivel para atender.
  const blockedDateRaw: Array<{ date: number }> = await prisma.$queryRaw`
     SELECT
      EXTRACT(DAY FROM S.DATE) AS date,
      COUNT(S.date) AS amount,
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size
    FROM schedulings S
    LEFT JOIN user_time_intervals UTI
      ON UTI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))
    WHERE S.user_id = ${user?.id}
      AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}
    GROUP BY EXTRACT(DAY FROM S.DATE),
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)
    HAVING amount >= size
  `

  const blockedDates = blockedDateRaw.map((item) => item.date)

  return res.json({ blockedWeekDays, blockedDates })
}
