/** colocamos tudo que tem relação ao contexto aqui  */

import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { ActionTypes } from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
// import { ActionTypes, Cycle, cyclesReducer } from "../reducers/cycles";


interface CreateCycleData {
  task?: string;
  minutesAmount?: number;
}



interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  cycles: Cycle[]
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)
/** Usamos as CyclesContextType para typar createContext */

interface CycleContextProviderProps {
  children: ReactNode;
}




// criando component context provider
export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  }, () => {

    const storedStateAsJSON = localStorage.getItem(
      "@ignite-timer:cycles-state-1.0.0",
    )

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON);
    }

    return {
      cycles: [],
      activeCycleId: null,
    }
  }
  )
  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId) // variavel para setar o time, da task correta.

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {

    /** função para salvar de onde para o tempo da ação do projeto salve 
     * no localstorage
     */
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate)
      )
    }


    return 0
  })

  // salvando em localstorage
  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);
    /** Dica boa para nomear variaveis do localstorage
     * use o @ com prefixo da aplicação
     * seguido com de : o nome do localstorage
     * e versão da aplicação para produção.
     */
    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON)
  }, [cyclesState])


  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {

    dispatch({
      type: ActionTypes.mark_current_finished_cycle,
      payload: {
        interruptCurrentCycle,
      }
    })
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime()) // global para setar estado de ativo.
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch({
      type: ActionTypes.add_new_cycle,
      payload: {
        newCycle,
      }
    })
    // setCycles((state) => [...state, newCycle])
    setAmountSecondsPassed(0) // para quando começar o novo circulo do zero.
    // reset()
  }

  function interruptCurrentCycle() {
    /** está função é para interromper o tarefa atual, caso ocorra isso
     * setaremos seu valor preenchendo o campo interruptedDate adicionando
     * a data e hora da ação caso não ele retorna a array normal.
     */
    // setCycles((state) =>

    // )

    dispatch({
      type: ActionTypes.interrupt_current_cycle,
      payload: {
        activeCycleId,
      }
    })
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        cycles
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}