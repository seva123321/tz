import Link from 'next/link'
import Image from 'next/image'
import { APP_ROUTES } from '@/lib/routes'
import styles from './UserCard.module.css'

type User = {
  id: number
  login: string
  avatar_url: string
  html_url: string
}

export default function UserCard({ user }: { user: User }) {
  return (
    <Link href={APP_ROUTES.user(user.login)} className={styles.card}>
      <Image
        src={user.avatar_url}
        alt={user.login}
        width={60}
        height={60}
        className={styles.avatar}
      />
      <div>
        <h3 className={styles.login}>{user.login}</h3>
        <p className={styles.url}>{user.html_url}</p>
      </div>
    </Link>
  )
}
