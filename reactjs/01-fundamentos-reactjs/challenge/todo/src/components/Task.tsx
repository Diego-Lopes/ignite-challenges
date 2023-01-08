import style from './Task.module.css';

import {PlusCircle} from 'phosphor-react'

export function Task() {
  return (
    <form className={style.container}>
      <input className={style.input} placeholder="Adicione uma nova tarefa"/>
      <button className={style.button}>Criar <PlusCircle size={16}/></button>
    </form>
  )
}