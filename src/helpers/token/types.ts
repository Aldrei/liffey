
export type JWTData = {
  user?: {
    id: string
    email: string
    username: string
  }
  client?: {
    id: string
  }
  error?: string
}
