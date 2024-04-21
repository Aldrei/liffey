import { cityParseEnToPt } from "./city";
import { employeeParseEnToPt } from "./employee";
import { neighborhoodParseEnToPt } from "./neighborhood";
import { ownerParseEnToPt } from "./owner";
import { photoParseEnToPt } from "./photo";

export const propertySource = [{
  "id": 12345,
  "client_id": 5,
  "city_id": 431,
  "neighborhood_id": 789,
  "owner_id": 456,
  "agent_id": 789,
  "broker_id": 123,
  "code": 456,
  "codeTipo": 789,
  "codePretty": "AB123",
  "nomeImovel": "Fake Property",
  "matricula": "M123456",
  "lote": "L123",
  "quadra": "Q123",
  "empreendimento": 1,
  "placa": 0,
  "possuiFoto": 1,
  "exclusividade": 1,
  "exclusividadePeriodoInicio": "2024-03-01",
  "exclusividadePeriodoFim": "2024-06-01",
  "finalidade": "Residential",
  "categoria": "House",
  "tipo": "Detached",
  "status": "For Sale",
  "aluguelPeriodoInicio": "2024-03-15",
  "aluguelPeriodoFim": "2024-09-15",
  "dormitorio": "4",
  "garagem": "2",
  "lavanderia": 1,
  "telhado": "Tiles",
  "forro": "Plaster",
  "piso": "Wood",
  "aberturas": "Aluminum",
  "alarme": 1,
  "portaoEletronico": 1,
  "pocoArtesiano": 0,
  "cercaEletrica": 1,
  "cameraDeVideo": 1,
  "nascerDoSol": "Back",
  "descGeral": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "dataAgenciamento": "2024-02-15",
  "dataVenda": "2024-04-01",
  "apNomeCondominio": "Condo ABC",
  "apPredio": "Tower A",
  "apPavimento": "10th",
  "apTotalPavimentos": "15",
  "apApto": "1001",
  "apElevador": 1,
  "areaTotal": 300.50,
  "areaConstruida": 250.75,
  "areaFrente": 15.50,
  "areaFundos": 20.75,
  "areaDireita": 10.25,
  "areaEsquerda": 10.25,
  "valor": 500000.00,
  "valorCondicaoDeComissao": "Fixed",
  "valorPorcentagemDeComissao": 3.5,
  "valorPorcentagemDoCorretor": 1.5,
  "valorPorcentagemDoAgenciador": 2,
  "valorCondominio": 350.00,
  "valorIPTUPago": "Yes",
  "valorIPTU": 500.00,
  "valorInssPago": "No",
  "valorInss": 0,
  "valorIndiceDoCUB": 2000.00,
  "valorAlgoParaRegularizar": "No",
  "valorAlgoParaRegularizarDesc": "",
  "condAgente": "John Doe",
  "condPrestacao": 1000.00,
  "condSaldoDevedor": 50000.00,
  "condPrazo": "24 months",
  "condReajuste": "IGPM",
  "condFGTS": 1,
  "condDoacao": 0,
  "condFinanciamento": 1,
  "condCartaConsorcio": 0,
  "condPartePermuta": 0,
  "condSituacao": "Paid",
  "condObs": "Some observations here.",
  "localEstado": "SP",
  "localIdCidade": "123456",
  "localIdBairro": "789012",
  "localLogradouro": "123 Main St",
  "localNumero": "100",
  "localCEP": "12345-678",
  "localImediacoes": "Near the park",
  "latitude": "-23.5505",
  "longitude": "-46.6333",
  "zoom": 15,
  "sitePublicarImovel": 1,
  "sitePublicarValor": 1,
  "siteImovelDestaque": 1,
  "siteAcesso": "Public",
  "sitePublicarMapa": 1,
  "videoURL": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "idUltimaTransacao": "ABC123",
  "created_at": "2024-03-11 20:08:39",
  "updated_at": "2024-03-11 20:16:06"
}]

export const propertyParsePtToEn = <T>(source: any) => ({
  id: source.id,
  client_id: source.client_id,
  city_id: source.city_id,
  neighborhood_id: source.neighborhood_id,
  owner_id: source.owner_id,
  agent_id: source.agent_id,
  broker_id: source.broker_id,
  code: source.code,
  code_type: source.codeTipo,
  code_pretty: source.codePretty,
  property_name: source.nomeImovel,
  registration: source.matricula,
  lot: source.lote,
  block: source.quadra,
  development: source.empreendimento,
  sign: source.placa,
  has_photo: source.possuiFoto,
  exclusivity: source.exclusividade,
  exclusivity_start_period: source.exclusividadePeriodoInicio,
  exclusivity_end_period: source.exclusividadePeriodoFim,
  purpose: source.finalidade,
  category: source.categoria,
  type: source.tipo,
  status: source.status,
  rent_start_period: source.aluguelPeriodoInicio,
  rent_end_period: source.aluguelPeriodoFim,
  bedrooms: source.dormitorio,
  garage: source.garagem,
  laundry: source.lavanderia,
  roof: source.telhado,
  ceiling: source.forro,
  floor: source.piso,
  openings: source.aberturas,
  alarm: source.alarme,
  electronic_gate: source.portaoEletronico,
  artesian_well: source.pocoArtesiano,
  electric_fence: source.cercaEletrica,
  video_camera: source.cameraDeVideo,
  sunrise: source.nascerDoSol,
  general_description: source.descGeral,
  agency_date: source.dataAgenciamento,
  sale_date: source.dataVenda,
  condo_name: source.apNomeCondominio,
  condo_building: source.apPredio,
  condo_floor: source.apPavimento,
  condo_total_floors: source.apTotalPavimentos,
  condo_unit: source.apApto,
  condo_elevator: source.apElevador,
  total_area: source.areaTotal,
  built_area: source.areaConstruida,
  front_area: source.areaFrente,
  back_area: source.areaFundos,
  right_area: source.areaDireita,
  left_area: source.areaEsquerda,
  value: source.valor,
  commission_condition_value: source.valorCondicaoDeComissao,
  commission_percentage_value: source.valorPorcentagemDeComissao,
  broker_percentage_value: source.valorPorcentagemDoCorretor,
  agency_percentage_value: source.valorPorcentagemDoAgenciador,
  condo_value: source.valorCondominio,
  paid_iptu_value: source.valorIPTUPago,
  iptu_value: source.valorIPTU,
  paid_inss_value: source.valorInssPago,
  inss_value: source.valorInss,
  cub_index_value: source.valorIndiceDoCUB,
  regularization_something_value: source.valorAlgoParaRegularizar,
  regularization_something_description: source.valorAlgoParaRegularizarDesc,
  agent_condition: source.condAgente,
  installment_condition: source.condPrestacao,
  outstanding_balance_condition: source.condSaldoDevedor,
  deadline_condition: source.condPrazo,
  readjustment_condition: source.condReajuste,
  fgts_condition: source.condFGTS,
  donation_condition: source.condDoacao,
  financing_condition: source.condFinanciamento,
  consortium_letter_condition: source.condCartaConsorcio,
  exchange_part_condition: source.condPartePermuta,
  situation_condition: source.condSituacao,
  condition_observation: source.condObs,
  state_location: source.localEstado,
  city_location_id: source.localIdCidade,
  neighborhood_location_id: source.localIdBairro,
  location_street: source.localLogradouro,
  location_number: source.localNumero,
  location_zip_code: source.localCEP,
  nearby_locations: source.localImediacoes,
  latitude: source.latitude,
  longitude: source.longitude,
  zoom: source.zoom,
  publish_property_website: source.sitePublicarImovel,
  publish_value_website: source.sitePublicarValor,
  property_highlight_website: source.siteImovelDestaque,
  website_access: source.siteAcesso,
  publish_map_website: source.sitePublicarMapa,
  video_url: source.videoURL,
  last_transaction_id: source.idUltimaTransacao,
  created_at: source.created_at,
  updated_at: source.updated_at
} as T);

export const propertyParseEnToPt = <T>(source: any) => ({
  id: source.id,
  client_id: source.client_id,
  city_id: source.city_id,
  neighborhood_id: source.neighborhood_id,
  owner_id: source.owner_id,
  agent_id: source.agent_id,
  broker_id: source.broker_id,
  code: source.code,
  codeTipo: source.code_type,
  codePretty: source.code_pretty,
  nomeImovel: source.property_name,
  matricula: source.registration,
  lote: source.lot,
  quadra: source.block,
  empreendimento: source.development,
  placa: source.sign,
  possuiFoto: source.has_photo,
  exclusividade: source.exclusivity,
  exclusividadePeriodoInicio: source.exclusivity_start_period,
  exclusividadePeriodoFim: source.exclusivity_end_period,
  finalidade: source.purpose,
  categoria: source.category,
  tipo: source.type,
  status: source.status,
  aluguelPeriodoInicio: source.rent_start_period,
  aluguelPeriodoFim: source.rent_end_period,
  dormitorio: source.bedrooms,
  garagem: source.garage,
  lavanderia: source.laundry,
  telhado: source.roof,
  forro: source.ceiling,
  piso: source.floor,
  aberturas: source.openings,
  alarme: source.alarm,
  portaoEletronico: source.electronic_gate,
  pocoArtesiano: source.artesian_well,
  cercaEletrica: source.electric_fence,
  cameraDeVideo: source.video_camera,
  nascerDoSol: source.sunrise,
  descGeral: source.general_description,
  dataAgenciamento: source.agency_date,
  dataVenda: source.sale_date,
  apNomeCondominio: source.condo_name,
  apPredio: source.condo_building,
  apPavimento: source.condo_floor,
  apTotalPavimentos: source.condo_total_floors,
  apApto: source.condo_unit,
  apElevador: source.condo_elevator,
  areaTotal: source.total_area,
  areaConstruida: source.built_area,
  areaFrente: source.front_area,
  areaFundos: source.back_area,
  areaDireita: source.right_area,
  areaEsquerda: source.left_area,
  valor: source.value,
  valorCondicaoDeComissao: source.commission_condition_value,
  valorPorcentagemDeComissao: source.commission_percentage_value,
  valorPorcentagemDoCorretor: source.broker_percentage_value,
  valorPorcentagemDoAgenciador: source.agency_percentage_value,
  valorCondominio: source.condo_value,
  valorIPTUPago: source.paid_iptu_value,
  valorIPTU: source.iptu_value,
  valorInssPago: source.paid_inss_value,
  valorInss: source.inss_value,
  valorIndiceDoCUB: source.cub_index_value,
  valorAlgoParaRegularizar: source.regularization_something_value,
  valorAlgoParaRegularizarDesc: source.regularization_something_description,
  condAgente: source.agent_condition,
  condPrestacao: source.installment_condition,
  condSaldoDevedor: source.outstanding_balance_condition,
  condPrazo: source.deadline_condition,
  condReajuste: source.readjustment_condition,
  condFGTS: source.fgts_condition,
  condDoacao: source.donation_condition,
  condFinanciamento: source.financing_condition,
  condCartaConsorcio: source.consortium_letter_condition,
  condPartePermuta: source.exchange_part_condition,
  condSituacao: source.situation_condition,
  condObs: source.condition_observation,
  localEstado: source.state_location,
  localIdCidade: source.city_location_id,
  localIdBairro: source.neighborhood_location_id,
  localLogradouro: source.location_street,
  localNumero: source.location_number,
  localCEP: source.location_zip_code,
  localImediacoes: source.nearby_locations,
  latitude: source.latitude,
  longitude: source.longitude,
  zoom: source.zoom,
  sitePublicarImovel: source.publish_property_website,
  sitePublicarValor: source.publish_value_website,
  siteImovelDestaque: source.property_highlight_website,
  siteAcesso: source.website_access,
  sitePublicarMapa: source.publish_map_website,
  videoURL: source.video_url,
  idUltimaTransacao: source.last_transaction_id,
  created_at: source.created_at,
  updated_at: source.updated_at,
  city: {
    data: cityParseEnToPt(source?.city?.data)
  },
  neighborhood: {
    data: neighborhoodParseEnToPt(source?.neighborhood?.data)
  },
  owner: {
    data: ownerParseEnToPt(source?.owner?.data)
  },
  broker: {
    data: employeeParseEnToPt(source?.broker?.data)
  },
  agent: {
    data: employeeParseEnToPt(source?.agent?.data)
  },
  photo: {
    data: photoParseEnToPt(source?.photo?.data)
  },
  video: {
    data: photoParseEnToPt(source?.video?.data)
  },
} as T);

export const propertyParsePayloadPtToEn = <T>(source: any) => ({
  id: source.id,
  client_id: source.client_id,
  city_id: source.city_id,
  neighborhood_id: source.neighborhood_id,
  owner_id: source.owner_id,
  agent_id: source.agent_id,
  broker_id: source.broker_id,
  code: source.code,
  code_type: source.codeTipo,
  code_pretty: source.codePretty,
  property_name: source.nomeImovel,
  registration: source.matricula,
  lot: source.lote,
  block: source.quadra,
  development: source.empreendimento,
  sign: source.placa,
  has_photo: source.possuiFoto,
  exclusivity: source.exclusividade,
  exclusivity_start_period: source.exclusividadePeriodoInicio,
  exclusivity_end_period: source.exclusividadePeriodoFim,
  purpose: source.finalidade,
  category: source.categoria,
  type: source.tipo,
  status: source.status,
  rent_start_period: source.aluguelPeriodoInicio,
  rent_end_period: source.aluguelPeriodoFim,
  bedrooms: source.dormitorio,
  garage: source.garagem,
  laundry: source.lavanderia,
  roof: source.telhado,
  ceiling: source.forro,
  floor: source.piso,
  openings: source.aberturas,
  alarm: source.alarme,
  electronic_gate: source.portaoEletronico,
  artesian_well: source.pocoArtesiano,
  electric_fence: source.cercaEletrica,
  video_camera: source.cameraDeVideo,
  sunrise: source.nascerDoSol,
  general_description: source.descGeral,
  agency_date: source.dataAgenciamento,
  sale_date: source.dataVenda,
  condo_name: source.apNomeCondominio,
  condo_building: source.apPredio,
  condo_floor: source.apPavimento,
  condo_total_floors: source.apTotalPavimentos,
  condo_unit: source.apApto,
  condo_elevator: source.apElevador,
  total_area: source.areaTotal,
  built_area: source.areaConstruida,
  front_area: source.areaFrente,
  back_area: source.areaFundos,
  right_area: source.areaDireita,
  left_area: source.areaEsquerda,
  value: source.valor,
  commission_condition_value: source.valorCondicaoDeComissao,
  commission_percentage_value: source.valorPorcentagemDeComissao,
  broker_percentage_value: source.valorPorcentagemDoCorretor,
  agency_percentage_value: source.valorPorcentagemDoAgenciador,
  condo_value: source.valorCondominio,
  paid_iptu_value: source.valorIPTUPago,
  iptu_value: source.valorIPTU,
  paid_inss_value: source.valorInssPago,
  inss_value: source.valorInss,
  cub_index_value: source.valorIndiceDoCUB,
  regularization_something_value: source.valorAlgoParaRegularizar,
  regularization_something_description: source.valorAlgoParaRegularizarDesc,
  agent_condition: source.condAgente,
  installment_condition: source.condPrestacao,
  outstanding_balance_condition: source.condSaldoDevedor,
  deadline_condition: source.condPrazo,
  readjustment_condition: source.condReajuste,
  fgts_condition: source.condFGTS,
  donation_condition: source.condDoacao,
  financing_condition: source.condFinanciamento,
  consortium_letter_condition: source.condCartaConsorcio,
  exchange_part_condition: source.condPartePermuta,
  situation_condition: source.condSituacao,
  condition_observation: source.condObs,
  state_location: source.localEstado,
  city_location_id: source.localIdCidade,
  neighborhood_location_id: source.localIdBairro,
  location_street: source.localLogradouro,
  location_number: source.localNumero,
  location_zip_code: source.localCEP,
  nearby_locations: source.localImediacoes,
  latitude: source.latitude,
  longitude: source.longitude,
  zoom: source.zoom,
  publish_property_website: source.sitePublicarImovel,
  publish_value_website: source.sitePublicarValor,
  property_highlight_website: source.siteImovelDestaque,
  website_access: source.siteAcesso,
  publish_map_website: source.sitePublicarMapa,
  video_url: source.videoURL,
  last_transaction_id: source.idUltimaTransacao,
  created_at: source.created_at,
  updated_at: source.updated_at
} as T);
