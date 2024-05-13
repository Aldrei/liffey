import { cityParseEnToPt } from "./city";
import { neighborhoodParseEnToPt } from "./neighborhood";

export const employeeParsePayloadPtToEn = <T>(source: any): T => {
  const data = employeeParsePtToEn<T>(source) as Partial<T & { roles: string[] }>

  data.roles = source.roles

  return data as T
}

export const employeeParsePtToEn = <T>(source: any): T => (!source ? null :{
  id: source.id,
  user_id: source.user_id,
  client_id: source.client_id,
  city_id: source.city_id,
  neighborhood_id: source.neighborhood_id,
  name: source.nome,
  birth_date: source.dataNascimento,
  position: source.cargo,
  base_salary: source.salarioBase,
  creci: source.creci,
  system_user: source.usuarioDoSistema,
  active: source.ativo,
  state: source.estado,
  idCidade: source.idCidade,
  idBairro: source.idBairro,
  street: source.logradouro,
  number: source.numero,
  zip_code: source.cep,
  apartment: source.apto,
  email: source.email,
  email2: source.email2,
  cellphone: source.celular,
  phone: source.fixo,
  photo: source.foto,
  thumbnail: source.fotoMini,
  publish_on_website: source.publicarNoSite,
  hidden: source.oculto,
  created_at: source.created_at,
  updated_at: source.updated_at,
}) as T

export const employeeParseEnToPt = <T>(source: any): T => (!source ? null :{
  id: source.id,
  user_id: source.user_id,
  client_id: source.client_id,
  city_id: source.city_id,
  neighborhood_id: source.neighborhood_id,
  nome: source.name,
  dataNascimento: source.birth_date,
  cargo: source.position,
  salarioBase: source.base_salary,
  creci: source.creci,
  usuarioDoSistema: source.system_user,
  ativo: source.active,
  estado: source.state,
  idCidade: source.idCidade,
  idBairro: source.idBairro,
  logradouro: source.street,
  numero: source.number,
  cep: source.zip_code,
  apto: source.apartment,
  email: source.email,
  email2: source.email2,
  celular: source.cellphone,
  fixo: source.phone,
  foto: source.photo,
  fotoMini: source.thumbnail,
  publicarNoSite: source.publish_on_website,
  oculto: source.hidden,
  created_at: source.created_at,
  updated_at: source.updated_at,
  city: {
    data: cityParseEnToPt(source?.city?.data)
  },
  neighborhood: {
    data: neighborhoodParseEnToPt(source?.neighborhood?.data)
  },
}) as T
