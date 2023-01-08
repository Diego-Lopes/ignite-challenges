import style from "./ListTask.module.css";
import { EmptyList } from "./EmptyList";
import { CardTask } from "./CardTask";

export function ListTask() {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.createTask}>
          <p>Tarefas criadas</p>
          <p>0</p>
        </div>

        <div className={style.completTask}>
          <p>Concluídas</p>
          <p>0</p>
        </div>
      </div>
      {/* <EmptyList /> */}
      <CardTask
        isCompleted={function (): void {
          throw new Error("Function not implemented.");
        }}
        handleDeleted={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
