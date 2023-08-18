import { CaretLeft, CaretRight } from 'phosphor-react'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'
import { getWeekDays } from '@/utils/get-week-days'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'

// criando tipagem para separar por semana
interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

interface CalendarProps {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}

export function Calendar({ onDateSelected, selectedDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  function handlePreviousMounth() {
    const previousMounthDate = currentDate.subtract(1, 'month')

    setCurrentDate(previousMounthDate)
  }

  function handleNextMounth() {
    const previousMounthDate = currentDate.add(1, 'month')

    setCurrentDate(previousMounthDate)
  }

  const shortWeekday = getWeekDays({ short: true })

  const currentMounth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  /**
   * Calculo de inserção de dias
   */

  const calendarWeeks = useMemo(() => {
    // 1 quantos dias existe no mês?
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    /**
     * observação
     * 'date' é o dia e
     * 'day' dia da semana
     */

    /**
     * 2 descobrir os dias da semana e mostrar o do mês atual,
     * e não clicar no dia que não corresponde ao mês selecionado.
     */
    const firstWeekDay = currentDate.get('day')

    /**
     * 3 pegando os dias do mês passado para preencher a lacunas quando não
     * começa o mês no domingo.
     */
    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    /**
     * Agora pegar os dias do mês que vem quando não fecha nos sábados.
     */
    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
      /**
       * fazendo a verificação com a base do dia atual, não selecionar os
       * dias passados
       */
      ...daysInMonthArray.map((date) => {
        return { date, disabled: date.endOf('day').isBefore(new Date()) }
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true }
      }),
    ]

    /**
     * agora separar por semanas
     */
    const calendarWeek = calendarDays.reduce<CalendarWeeks>(
      /**
       * weeks: referece ao array lá em baixo, cada interação do reduce
       * podemos manipular weeks.
       *
       * _:são os valores do array, o diego colocou anderline pois não intereça
       * os valores do array e sim index deles.
       *
       * i: representa o index dos arrays, que vamos usar para calcular a semana.
       *
       * original: é os dados recebido do array original e nele podemos manipular
       * ele e não vai modificar no array de fora recebido, isso também existe no
       * map e outros.
       */
      (weeks, _, i, original) => {
        // criando um variavel booleano, para verificar se NÃO fechou uma semana.
        const isNewWeek = i % 7 === 0
        // validando
        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }
        return weeks
      },
      [],
    )

    return calendarWeek
  }, [currentDate])

  // console.log(calendarWeeks)

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMounth} <span>{currentYear}</span>
        </CalendarTitle>
        <CalendarActions>
          <button onClick={handlePreviousMounth} title="Previous month">
            <CaretLeft />
          </button>
          <button onClick={handleNextMounth} title="Next month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>
      <CalendarBody>
        <thead>
          <tr>
            {shortWeekday.map((shortDay) => (
              <th key={shortDay}>{shortDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()}>
                      <CalendarDay
                        /**
                         * aqui usamos date.toDate() nativo do js,
                         * quando comunição com algo de fora melhor forma usar
                         * os componentes nativos do javascript
                         *  */
                        onClick={() => onDateSelected(date.toDate())}
                        disabled={disabled}
                      >
                        {date.get('date')}
                      </CalendarDay>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
