import { Trash } from 'phosphor-react';
import style from './CardTask.module.css';
import checked from '../assets/checked.svg';

interface ICardTaskProps {
  isCompleted: () => void
  handleDeleted: () => void
}

export function CardTask({isCompleted, handleDeleted}:ICardTaskProps) {
  
  return (
    <div className={style.container}>
      <div className={style.button} onClick={isCompleted}>
        <div className="circle"></div>
        <img src={checked} alt="icon checado" />
      </div>
      <p className={style.text}>Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.</p>
      <Trash className={style.trash} width={24} height={24} color="#808080" onClick={handleDeleted}/>
    </div>
  )
}