import { zodResolver } from '@hookform/resolvers/zod';
import { Play } from 'phosphor-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput
} from './styles';

const newCycleFormValidationSchema = zod.object({ // criando o objeto de regras para passar no zodResolver.
  task: zod.string().min(1, "Informa a tarefa"),
  minutesAmount: zod.number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
})

// interface NewCycleFormData {
//   task: string;
//   minutesAmount: number;
// }

// tipando useForm com base do objeto zod
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // usamos infer de infereir do zod para deixar dinâmico a tipagem


interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}
export function Home() {

  const [] = useState<>()

  const { register, handleSubmit, watch, formState, reset  } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema), // integração com zod usando hookform
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });

  function handleCreateNewCycle(data:NewCycleFormData) {
    console.log(data);
    reset();
  }
  console.log(formState.errors); // visualizando o error.

  const task = watch('task'); // observando em tempo real o valor do input
  const isSubmitDisabled = !task; // variavel auxiliar bem explicativa
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">vou trabalhar em</label>
          <TaskInput
            list="task-suggestions"
            id="task"
            placeholder="Dê um nome para o seu projetos"
            {...register("task")}
          />

          <datalist id='task-suggestions'>
            <option value="projeto 1" />
            <option value="projeto 2" />
            <option value="projeto 3" />
            <option value="pepeino" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
