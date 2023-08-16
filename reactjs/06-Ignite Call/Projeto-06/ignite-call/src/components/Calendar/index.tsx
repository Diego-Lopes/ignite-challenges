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

export function Calendar() {
  const shortWeekday = getWeekDays({ short: true })

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          Agosto <span>2023</span>
        </CalendarTitle>
        <CalendarActions>
          <button>
            <CaretLeft />
          </button>
          <button>
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
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <CalendarDay>1</CalendarDay>
          </td>
          <td>
            <CalendarDay disabled>2</CalendarDay>
          </td>
          <td>
            <CalendarDay>3</CalendarDay>
          </td>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
