export const neighborhoodParseEnToPt = <T>(source: any): T => (!source ? null : {
  id: source.id,
  city_id: source.city_id,
  client_id: source.client_id,
  nome: source.name 
}) as T

export const neighborhoodParsePtToEn = <T>(source: any): T => (!source ? null : {
  id: source.id,
  city_id: source.city_id,
  client_id: source.client_id,
  name: source.nome
}) as T
