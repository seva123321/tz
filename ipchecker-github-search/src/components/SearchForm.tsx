'use client'

import { useState } from 'react'
import { useGitHubSearch } from '@/hooks/useGitHubSearch'
import UserCard from './UserCard'
import styles from './SearchForm.module.css'

export default function SearchForm() {
  const [query, setQuery] = useState('')
  const { data, loading, error, empty } = useGitHubSearch(query)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите имя пользователя GitHub"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Найти
        </button>
      </form>

      {loading && <p className={styles.message}>Загрузка...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {empty && <p className={styles.message}>Ничего не найдено</p>}

      {data.length > 0 && (
        <div className={styles.results}>
          {data.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}
