import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";
import { CountdownContainer, Separator } from "./styles";

interface CountdownProps {
  activeCycle: any;
  setCycles: any;
}


export function Countdown({activeCycle, setCycles}: CountdownProps) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    // efeito responsável que calcula a diferença em segundo o countdown.
    useEffect(() => {
      let interval: number;
      if (activeCycle) {
        interval = setInterval(() => {
          const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)
  
  
          if (secondsDifference >= totalSeconds) {
            setCycles(
              state => state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                  return { ...cycle, finishedDate: new Date() }
                } else {
                  return cycle;
                }
              }),
            )
            setAmountSecondsPassed(totalSeconds);
            clearInterval(interval)
            handleInterruptCycle();
          } else {
            setAmountSecondsPassed(secondsDifference);
          }
        }, 1000)
      }
  
      return () => {
        clearInterval(interval)
      }
    }, [activeCycle, totalSeconds, activeCycleId])

  // criando countdown, variavel total em segundos.
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; // fazendo a conversão para segundos, pois recebemos do input em minutos.
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0; // fazendo o calculo da diferença para mostra na tela.

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");
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