export type Theme = 'light' | 'dark'
export type Language = 'en' | 'ru'
export type GenresFilterValueType = 'all' | 'movies' | 'serials' | 'anime'

export type Genre = {
  id: number
  name: string
}
export enum UserStatus {
  Online = 'Online',
  Offline = 'Offline',
  Watching = 'Watching',
}

export interface Movie {
  id: number
  name: string
  image: string
  year: string
  type: GenresFilterValueType
  genres: Genre['id'][]
  description: string
  rate: number
  posters: string[]
}

export interface User {
  id: number
  username: string
  user_status: UserStatus
  avatar?: string
  level: number
  xp: number
  // Personal
  language?: Language
  theme?: Theme
  // General
  email: string
  name?: string
  county?: string
  status?: string

  // Social
  friends?: User['id']

  // movies
  rated?: {
    movie: Movie['id']
    rate: number
  }
  favorite?: Movie['id'][]
  viewed?: Movie['id'][]
}
