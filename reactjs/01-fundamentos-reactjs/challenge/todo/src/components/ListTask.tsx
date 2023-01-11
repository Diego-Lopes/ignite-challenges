import style from "./ListTask.module.css";
import { EmptyList } from "./EmptyList";
import { CardTask } from "./CardTask";
import { IAppProps } from "../App";

interface IListTaskProps {
  data: IAppProps[];
  countCheckeds: number;
  onHandleCheckedsChange: (value: string)=> void;
  onHandleDeleteTask: (value: string) => void;
}

export function ListTask({ data, countCheckeds,onHandleCheckedsChange, onHandleDeleteTask }: IListTaskProps) {

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.createTask}>
          <p>Tarefas criadas</p>
          <p>{data.length}</p>
        </div>

        <div className={style.completTask}>
          <p>Concluídas</p>
          <p>{`${countCheckeds} / ${data.length}`}</p>
        </div>
      </div>

      {data.length > 0 ? (
        <CardTask
          data={data}
          isCompleted={onHandleCheckedsChange}
          handleDeleted={onHandleDeleteTask}
        />
      ) : (
        <EmptyList />
      )}
    </div>
  );
}
