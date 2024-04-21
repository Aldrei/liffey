export const photoParsePtToEn = (source: any) => ({
  id: source.id,
  property_id: source.property_id,
  type: source.tipo,
  src: source.src,
  thumb: source.srcMini,
  main_media: source.midiaPrincipal,
  caption: source.legenda,
  order: source.ordem,
  rotate: source.rotate,
  created_at: source.created_at,
  updated_at: source.updated_at,
})

export const photoParseEnToPt = (source: any) => (source ? {
  id: source.id,
  property_id: source.property_id,
  tipo: source.tipo,
  src: source.src,
  srcMini: source.srcMini,
  midiaPrincipal: source.midiaPrincipal,
  legenda: source.legenda,
  ordem: source.ordem,
  thumb: source.thumb,
  normal: source.normal,
  rotate: source.rotate,
  created_at: source.created_at,
  updated_at: source.updated_at,
} : null)

export const photoPositionsParsePtToEn = (source: any) => source.map((photo: any) => ({ 
  photo_id: photo.photo_id,
  order: photo.posicao
}))
