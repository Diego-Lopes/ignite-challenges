import styles from './Header.module.css';
import logoIgnite from '../assets/logoIgnite.svg';
export function Header() {
  return (
    <header className={styles.header}>
      <img src={logoIgnite} alt="Logo tipo ignite" />
    </header>
  );
}