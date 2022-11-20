import { PencilLine } from 'phosphor-react';
import { Avatar } from './Avatar';
import styles from './Sidebar.module.css';

export function Siderbar() {
  return(
    <aside className={styles.sidebar}>
     <img className={styles.cover} src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=30" />

     <div className={styles.profile}>
      <Avatar src="https://github.com/Diego-Lopes.png"/>
      <strong>Diego Lopes</strong>
      <span>Web Developer</span>
     </div>
     <footer>
      
        <a href="#"> <PencilLine size={20}/>Editar seu perfil</a>
      </footer>
    </aside>
  )
}