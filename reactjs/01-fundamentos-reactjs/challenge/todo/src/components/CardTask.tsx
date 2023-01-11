import { Trash } from "phosphor-react";
import style from "./CardTask.module.css";
import checked from "../assets/checked.svg";
import { IAppProps } from "../App";

interface ICardTaskProps {
  isCompleted: (value: string) => void;
  handleDeleted: (value: string) => void;
  data: IAppProps[];
}

export function CardTask({
  data,
  isCompleted,
  handleDeleted,
}: ICardTaskProps) {

  return data.map((task, index) => (
    <div key={index} className={style.container}>
      <div className={style.button} onClick={()=>{isCompleted(task.taskName)}}>
        <div className="circle"></div>
        <img src={checked} alt="icon checado" />
      </div>
      <p className={task.checked ? style.textChecked : style.text}>{task.taskName}</p>
      <Trash
        className={style.trash}
        width={24}
        height={24}
        color="#808080"
        onClick={() => {handleDeleted(task.taskName)}}
      />
    </div>
  ));
}
