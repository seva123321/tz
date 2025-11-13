import SearchForm from '@/components/SearchForm'
import styles from './page.module.css'

export default function HomePage() {
  return (
    <div>
      <h1 className={styles.header}>Поиск пользователей GitHub</h1>
      <SearchForm />
    </div>
  )
}
