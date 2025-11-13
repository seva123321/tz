import { API_ROUTES } from '@/lib/routes'
import { useState, useEffect } from 'react'

type GitHubUser = {
  id: number
  login: string
  avatar_url: string
  html_url: string
}

type SearchResult = {
  total_count: number
  items: GitHubUser[]
}

export const useGitHubSearch = (query: string) => {
  const [data, setData] = useState<GitHubUser[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [empty, setEmpty] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      queueMicrotask(() => {
        setData([])
        setEmpty(false)
      })
      return
    }

    const handler = setTimeout(() => {
      setLoading(true)
      setError(null)
      setEmpty(false)

      fetch(
        `${API_ROUTES.base}${API_ROUTES.searchUsers(encodeURIComponent(query))}`
      )
        .then(async (res) => {
          if (!res.ok) {
            if (res.status === 403) {
              throw new Error('API rate limit exceeded. Try again later.')
            } else {
              throw new Error(`HTTP error! status: ${res.status}`)
            }
          }
          return res.json()
        })
        .then((result: SearchResult) => {
          setData(result.items)
          setEmpty(result.total_count === 0)
        })
        .catch((err) => {
          setError(err.message)
        })
        .finally(() => {
          setLoading(false)
        })
    }, 500)

    return () => clearTimeout(handler)
  }, [query])

  return { data, loading, error, empty }
}
