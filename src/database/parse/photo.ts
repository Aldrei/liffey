
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

export const photoPositionsParsePtToEn = (source: any) => source.map((photo: any) => ({ 
  photo_id: photo.photo_id,
  order: photo.posicao
}))
