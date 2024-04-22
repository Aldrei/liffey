
export type JWTData = {
  user?: {
    id: string
    email: string
  }
  client?: {
    id: string
  }
  error?: string
}
