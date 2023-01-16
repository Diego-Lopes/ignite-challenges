import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

export function NewCycleForm() {


  const newCycleFormValidationSchema = zod.object({ // criando o objeto de regras para passar no zodResolver.
    task: zod.string().min(1, "Informa a tarefa"),
    minutesAmount: zod.number()
      .min(1, "O ciclo precisa ser de no mínimo 5 minutos")
      .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
  })

  // tipando useForm com base do objeto zod
  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // usamos infer de infereir do zod para deixar dinâmico a tipagem

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema), // integração com zod usando hookform
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  });

  return (
    <FormContainer>
      <label htmlFor="task">vou trabalhar em</label>
      <TaskInput
        list="task-suggestions"
        id="task"
        placeholder="Dê um nome para o seu projetos"
        {...register("task")}
        disabled={!!activeCycle}
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
        min={1}
        max={60}
        {...register("minutesAmount", { valueAsNumber: true })}
        disabled={!!activeCycle} // colocando duas exclamação fazemos um bollean
      />
      <span>minutos.</span>
    </FormContainer>
  )
}