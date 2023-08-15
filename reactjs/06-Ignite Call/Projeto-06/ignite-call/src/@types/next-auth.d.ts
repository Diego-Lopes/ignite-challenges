import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    name: string
    email: string
    username: string
    avatar_url: string
  }

  // para parar de dar erro no api time-intervals
  interface Session {
    user: User
  }
}
