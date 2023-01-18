/** colocamos tudo que tem relação ao contexto aqui  */

import { createContext, ReactNode, useReducer, useState } from "react";


interface CreateCycleData {
  task?: string;
  minutesAmount?: number;
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
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
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    if(action.type === 'add_new_cycle'){
      return [...state, action.payload.newCycle]
    }
    
    return state
  }, [])


  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId) // variavel para setar o time, da task correta.

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
    dispatch({
      type: "mark_current_finished_cycle",
      payload: {
       interruptCurrentCycle,
      }
    })
    setActiveCycleId(null)
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
      type: "add_new_cycle",
      payload: {
       newCycle,
      }
    })
    // setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0) // para quando começar o novo circulo do zero.
    // reset()
  }

  function interruptCurrentCycle() {
    /** está função é para interromper o tarefa atual, caso ocorra isso
     * setaremos seu valor preenchendo o campo interruptedDate adicionando
     * a data e hora da ação caso não ele retorna a array normal.
     */
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )

    dispatch({
      type: "interrupt_current_cycle",
      payload: {
        activeCycleId,
      }
    })
    setActiveCycleId(null)
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