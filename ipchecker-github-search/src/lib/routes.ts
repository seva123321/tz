export const APP_ROUTES = {
  home: () => '/',
  user: (id: string) => `/users/${encodeURIComponent(id)}`,
} as const

export const API_ROUTES = {
  base: 'https://api.github.com',
  searchUsers: (query: string) =>
    `/search/users?q=${encodeURIComponent(query)}`,
  user: (login: string) => `/users/${encodeURIComponent(login)}`,
} as const
