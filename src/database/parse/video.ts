export const photoParseEnToPt = (source: any) => (source ? {
  id: source.id,
  property_id: source.property_id,
  src: source.src,
  caption: source.srcMini,
  order: source.order,
  created_at: source.created_at,
  updated_at: source.updated_at,
}: null)
