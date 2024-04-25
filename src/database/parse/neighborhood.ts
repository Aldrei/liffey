export const neighborhoodParseEnToPt = <T>(source: any): T => (!source ? null : {
  id: source.id,
  nome: source.name 
}) as T
