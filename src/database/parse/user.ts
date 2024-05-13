export const userParsePayloadPtToEn = <T>(source: any): T => {
  const data = userParsePtToEn<T>(source) as Partial<T & { roles: string[] }>

  data.roles = source.roles

  return data as T
}

export const userParsePtToEn = <T>(source: any): T => (!source ? null :{
  id: source.id,
  name: source.nome,
  username: source.username,
  email: source.email,
  password: source.password,
  password_temp: source.password_temp,
  remember_token: source.remember_token,
  token_push: source.token_push,
  created_at: source.created_at,
  updated_at: source.updated_at,
}) as T

export const userParseEnToPt = <T>(source: any): T => (!source ? null :{
  id: source.id,
  name: source.name,
  username: source.username,
  email: source.email,
  password: source.password,
  password_temp: source.password_temp,
  remember_token: source.remember_token,
  token_push: source.token_push,
  created_at: source.created_at,
  updated_at: source.updated_at,
}) as T
