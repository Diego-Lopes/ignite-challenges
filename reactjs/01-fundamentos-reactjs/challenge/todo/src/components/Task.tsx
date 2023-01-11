import style from "./Task.module.css";
import { PlusCircle } from "phosphor-react";
import { FormEvent } from "react";

interface ITaskProps {
  task: string;
  setTask: (task: string) => void;
  onHandleCreateTask: () => void;
}

export function Task({ task, setTask, onHandleCreateTask }: ITaskProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onHandleCreateTask();
  }

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <input
        className={style.input}
        placeholder="Adicione uma nova tarefa"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className={style.button}>
        Criar <PlusCircle size={16} />
      </button>
    </form>
  );
}
