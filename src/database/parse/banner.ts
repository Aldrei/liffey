import { propertyParseEnToPt, propertyParsePtToEn } from "./property"

export const bannerParseEnToPt = <T>(source: any): T => (!source ? null : {
  id: source.id,
  client_id: source.client_id,
  property_id: source.property_id,
  titulo: source.title,
  subtitle: source.subtitle,
  descGeral: source.general_description,
  summary: source.summary,
  img: source.img,
  posicao: source.position,
  link: source.link,
  thumb: source.thumb,
  normal: source.normal,
  created_at: source.created_at,
  updated_at: source.updated_at,
  // Relationship/association
  property: {
    data: propertyParseEnToPt(source?.property?.data)
  },
}) as T

export const bannerParsePtToEn = <T>(source: any): T => (!source ? null : {
  id: source.id,
  client_id: source.client_id,
  property_id: source.property_id,
  title: source.titulo,
  subtitle: source.subtitle,
  general_description: source.descGeral,
  summary: source.summary,
  img: source.img,
  position: source.posicao,
  link: source.link,
  thumb: source.thumb,
  normal: source.normal,
  created_at: source.created_at,
  updated_at: source.updated_at,
  // Relationship/association
  property: {
    data: propertyParsePtToEn(source?.property?.data)
  },
}) as T
