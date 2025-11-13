import { notFound } from 'next/navigation'
import Link from 'next/link'
import styles from './UserDetail.module.css'
import Image from 'next/image'
import { APP_ROUTES, API_ROUTES } from '@/lib/routes'

type GitHubUser = {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
  html_url: string
  created_at: string
}

export default async function UserDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const res = await fetch(`${API_ROUTES.base}${API_ROUTES.user(id.trim())}`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    notFound()
  }

  const user: GitHubUser = await res.json()

  return (
    <div className={styles.container}>
      <Link href={APP_ROUTES.home()} className={styles.back}>
        ← Назад
      </Link>
      <div className={styles.card}>
        <Image
          src={user.avatar_url}
          alt={user.login}
          width={100}
          height={100}
          className={styles.avatar}
        />
        <h1 className={styles.name}>{user.name || user.login}</h1>
        <p className={styles.bio}>{user.bio || 'Биография отсутствует'}</p>
        <ul className={styles.stats}>
          <li>Репозитории: {user.public_repos}</li>
          <li>Подписчики: {user.followers}</li>
          <li>Подписок: {user.following}</li>
          <li>С GitHub с: {new Date(user.created_at).getFullYear()}</li>
        </ul>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.profileLink}
        >
          Открыть профиль на GitHub
        </a>
      </div>
    </div>
  )
}
