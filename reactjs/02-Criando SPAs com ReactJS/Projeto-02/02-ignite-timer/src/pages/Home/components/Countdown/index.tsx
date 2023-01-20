import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../../context/CyclesContext'
import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  // criando countdown, variavel total em segundos.
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 // fazendo a conversão para segundos, pois recebemos do input em minutos.

  // efeito responsável que calcula a diferença em segundo o countdown.
  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 // fazendo o calculo da diferença para mostra na tela.

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  // colocando o contator no título da aba do navegador.
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes} : ${seconds} | ${activeCycle.task} | Iginite Timer`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
