import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { CyclesContext } from '../../context/CyclesContext'

import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  // criando o objeto de regras para passar no zodResolver.
  task: zod.string().min(1, 'Informa a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

export function Home() {
  const {activeCycle, interruptCurrentCycle, createNewCycle} = useContext(CyclesContext)

  // tipando useForm com base do objeto zod
  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // usamos infer de infereir do zod para deixar dinâmico a tipagem

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema), // integração com zod usando hookform
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  const { handleSubmit, watch, /* reset */ } = newCycleForm

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
  /**  marcar task atual como concluído usando uma função para facilitar a tipagem
   * do typescript
   */


  const task = watch('task') // observando em tempo real o valor do input
  const isSubmitDisabled = !task // variavel auxiliar bem explicativa

  // console.log(formState.errors); // visualizando o error.

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Parar contagem
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
