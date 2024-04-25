export const cityParseEnToPt = <T>(source: any): T => (!source ? null : {
  id: source.id,
  client_id: source.client_id,
  state_id: source.state_id,
  name: source.name,
  long_desc: source.long_desc,
  created_at: source.created_at,
  updated_at: source.updated_at
}) as T

export const cityParsePtToEn = <T>(source: any): T => (!source ? null : {
  id: source.id,
  client_id: source.client_id,
  state_id: source.state_id,
  name: source.name,
  long_desc: source.long_desc,
  created_at: source.created_at,
  updated_at: source.updated_at
}) as T
