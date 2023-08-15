import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

/**
 * Precisamo fazer uma tipagem referente ao dados vindo do body, em questão da tipagem
 * não podemos fazer um dependencia do server-client, devemos fazer a tipagem no server-side
 * assim evita dependência de ambas as partes.
 * podemos usart type ou interface e também tipar com zod.
 * Nesse exemplo vamos usar do cursor, então vamos de zod,
 * e também é bom fazer a validação no server-side.
 */

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  // Verificando se existe ou não sessão.
  if (!session) {
    return res.status(401).end()
  }

  // trabalhar com o body da requisição.
  /**
   * sobre o .parse() ele faz a tipagem dos dados que recebe como parâmetro.
   * no modelo abaixo ele recebe req.body e tipa com Schema time interval.
   * o .parse() também dispara um erro caso não vier os dados de acordo com schema informado.
   * sem precisar de validar os dados com if/else, caso quera tratar com ifs use .safeParse() ele retorna com erro.
   */
  const { intervals } = timeIntervalsBodySchema.parse(req.body)

  // salvando em concorrência no sqlite usaremos Promise.all.
  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: session.user.id,
        },
      })
    }),
  )

  return res.status(201).end()
}
