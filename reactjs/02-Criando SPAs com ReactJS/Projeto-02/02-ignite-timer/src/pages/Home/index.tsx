import { HandPalm, Play } from 'phosphor-react';
import { useEffect, useState } from 'react';

import { Countdown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';
import {
  HomeContainer, StartCountdownButton,
  StopCountdownButton
} from './styles';



// interface NewCycleFormData {
//   task: string;
//   minutesAmount: number;
// }



interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}
export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId); // variavel para setar o time, da task correta.

  const task = watch('task'); // observando em tempo real o valor do input
  const isSubmitDisabled = !task; // variavel auxiliar bem explicativa

  console.log({ activeCycle });

  console.log(cycles);

  
  

 

  // useEffect(() => {
  //   if ("Notification" in window) {
  //     // Solicita permissão do usuário para enviar notificações
  //     Notification.requestPermission().then(function (permission) {
  //       // Se o usuário permitir, crie uma nova notificação
  //       if (permission === "granted") {
  //         const notification = new Notification(`${activeCycle.task ? activeCycle.task : "Terminou" } | Terminou`, {
  //           body: "Alô um dois três",
  //           icon: "src/assets/logo.svg"
  //         });
  //       }

  //     });
  //   }
  // }, [activeCycle])



  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime()); // global para setar estado de ativo.
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles(state => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0) // para quando começar o novo circulo do zero.
    reset();
  }

  // console.log(formState.errors); // visualizando o error.

  // colocando o contator no título da aba do navegador.
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes} : ${seconds} | ${activeCycle.task} | Iginite Timer`;
    } else {
      document.title = "Ignite Timer"
    }
  }, [minutes, seconds, activeCycle]);


  function handleInterruptCycle() {
    /** está função é para interromper o tarefa atual, caso ocorra isso
     * setaremos seu valor preenchendo o campo interruptedDate adicionando
     * a data e hora da ação caso não ele retorna a array normal.
     */
    setCycles(
      state => state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm />
        <Countdown activeCycle={activeCycle} setCycles={setCycles} activeCycleId={activeCycle}/>
       
        {
          activeCycle ? (
            <StopCountdownButton onClick={handleInterruptCycle} type="button">
              <HandPalm size={24} />
              Parar contagem
            </StopCountdownButton>
          ) :
            (
              <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                <Play size={24} />
                começar
              </StartCountdownButton>
            )
        }
      </form>
    </HomeContainer>
  )
}
