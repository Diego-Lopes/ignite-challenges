interface GetWeekDayParams {
  short?: boolean
}

export function getWeekDays({ short = false }: GetWeekDayParams) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  /**
   * .from() função faz converção para array conteúdo interável
   * Array() cria um array recebendo o número de posições
   * .keys() faz a com que o retorno das posições do array que estamos criando
   * retorno nos campos undefined em index da possição no array
   */
  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) => {
      if (short) {
        return weekDay.substring(0, 3).toUpperCase()
      }
      return weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
    })
}
