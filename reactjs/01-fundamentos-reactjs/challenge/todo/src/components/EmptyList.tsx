import style from './EmptyList.module.css';
import clipBoard from '../assets/Clipboard.png'; 

export function EmptyList() {
  return (
    <div className={style.listAll}>
      <div className={style.info} >
        <img src={clipBoard} alt="icone clipboard" />
        <div className={style.description}>
          <p>Você ainda não tem tarefas cadastradas</p>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
      </div>
    </div>
  )
}