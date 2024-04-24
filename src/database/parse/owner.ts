export const ownerSource = [{
  "id": 1,
  "client_id": 1001,
  "city_id": 789,
  "neighborhood_id": 456,
  "idProprietario": "PROP123456",
  "nomeRazao": "John Doe",
  "cpfCnpj": "123.456.789-00",
  "rg": "12345678",
  "cnh": "987654321",
  "pessoa": "Física",
  "inscricaoEstadual": "IE123456",
  "sexo": "M",
  "estadoCivil": "Solteiro",
  "dataNascimento": "1990-05-15",
  "naturalidade": "São Paulo",
  "profissao": "Engenheiro",
  "renda": 5000.00,
  "estado": "SP",
  "idCidade": "789012",
  "idBairro": "456789",
  "logradouro": "Rua Principal",
  "numero": "123",
  "cep": "12345-678",
  "apto": "Apto 101",
  "fixo": "(11) 9876-5432",
  "celular": "(11) 98765-4321",
  "fax": "(11) 1234-5678",
  "email": "john.doe@example.com",
  "email2": "johndoe@gmail.com",
  "obs": "Some observations here",
  "conjNome": "Jane Doe",
  "conjCpf": "987.654.321-00",
  "conjRg": "87654321",
  "conjCnh": "123456789",
  "conjDataNascimento": "1992-08-20",
  "conjNaturalidade": "Rio de Janeiro",
  "conjProfissao": "Advogada",
  "conjRenda": "4000.00",
  "conjPai": "João Silva",
  "conjMae": "Maria Silva",
  "conjMesmoEndereco": "Não",
  "conjEstado": "RJ",
  "conjIdCidade": "987654",
  "conjIdBairro": "654321",
  "conjLogradouro": "Avenida Principal",
  "conjNumero": "456",
  "conjCep": "54321-876",
  "conjApto": "Apto 201",
  "conjFixo": "(21) 8765-4321",
  "conjCelular": "(21) 87654-3210",
  "conjFax": "(21) 4321-5678",
  "conjEmail": "jane.doe@example.com",
  "conjEmail2": "janedoe@gmail.com",
  "conjSpc": "Sim",
  "conjSpcEntrada": "2022-01-01",
  "conjSpcSaida": "2022-06-30",
  "conjSpcValor": "1000.00",
  "conjObs": "Some observations for Jane Doe",
  "foto": "photo1.jpg",
  "fotoMini": "photo1_mini.jpg",
  "created_at": "2024-03-15 10:00:00",
  "updated_at": "2024-03-15 10:00:00"
}]

export const ownerParsePtToEn = <T>(source: any) => ({
    id: source.id,
    client_id: source.client_id,
    city_id: source.city_id,
    neighborhood_id: source.neighborhood_id,
    owner_id: source.idProprietario,
    name_or_company: source.nomeRazao,
    cpf_or_cnpj: source.cpfCnpj,
    rg: source.rg,
    driver_license: source.cnh,
    person_type: source.pessoa,
    state_registration: source.inscricaoEstadual,
    gender: source.sexo,
    marital_status: source.estadoCivil,
    birth_date: source.dataNascimento,
    place_of_birth: source.naturalidade,
    profession: source.profissao,
    income: source.renda,
    state: source.estado,
    idCidade: source.idCidade,
    idBairro: source.idBairro,
    street: source.logradouro,
    number: source.numero,
    zip_code: source.cep,
    apartment: source.apto,
    phone: source.fixo,
    cellphone: source.celular,
    fax: source.fax,
    email: source.email,
    email2: source.email2,
    notes: source.obs,
    spouse_name: source.conjNome,
    spouse_cpf: source.conjCpf,
    spouse_rg: source.conjRg,
    spouse_driver_license: source.conjCnh,
    spouse_birth_date: source.conjDataNascimento,
    spouse_place_of_birth: source.conjNaturalidade,
    spouse_profession: source.conjProfissao,
    spouse_income: source.conjRenda,
    spouse_father: source.conjPai,
    spouse_mother: source.conjMae,
    same_address_as_owner: source.conjMesmoEndereco,
    spouse_state: source.conjEstado,
    spouse_idCidade: source.conjIdCidade,
    spouse_idBairro: source.conjIdBairro,
    spouse_street: source.conjLogradouro,
    spouse_number: source.conjNumero,
    spouse_zip_code: source.conjCep,
    spouse_apartment: source.conjApto,
    spouse_phone: source.conjFixo,
    spouse_cellphone: source.conjCelular,
    spouse_fax: source.conjFax,
    spouse_email: source.conjEmail,
    spouse_email2: source.conjEmail2,
    spouse_credit_analysis: source.conjSpc,
    spouse_credit_analysis_entry: source.conjSpcEntrada,
    spouse_credit_analysis_exit: source.conjSpcSaida,
    spouse_credit_analysis_value: source.conjSpcValor,
    spouse_notes: source.conjObs,
    photo: source.foto,
    thumbnail: source.fotoMini,
    created_at: source.created_at,
    updated_at: source.updated_at
} as T);

export const ownerParseEnToPt = <T>(source: any) => ({
  id: source.id,
  client_id: source.client_id,
  city_id: source.city_id,
  neighborhood_id: source.neighborhood_id,
  idProprietario: source.owner_id,
  nomeRazao: source.name_or_company,
  cpfCnpj: source.cpf_or_cnpj,
  rg: source.rg,
  cnh: source.driver_license,
  pessoa: source.person_type,
  inscricaoEstadual: source.state_registration,
  sexo: source.gender,
  estadoCivil: source.marital_status,
  dataNascimento: source.birth_date,
  naturalidade: source.place_of_birth,
  profissao: source.profession,
  renda: source.income,
  estado: source.state,
  idCidade: source.idCidade,
  idBairro: source.idBairro,
  logradouro: source.street,
  numero: source.number,
  cep: source.zip_code,
  apto: source.apartment,
  fixo: source.phone,
  celular: source.cellphone,
  fax: source.fax,
  email: source.email,
  email2: source.email2,
  obs: source.notes,
  conjNome: source.spouse_name,
  conjCpf: source.spouse_cpf,
  conjRg: source.spouse_rg,
  conjCnh: source.spouse_driver_license,
  conjDataNascimento: source.spouse_birth_date,
  conjNaturalidade: source.spouse_place_of_birth,
  conjProfissao: source.spouse_profession,
  conjRenda: source.spouse_income,
  conjPai: source.spouse_father,
  conjMae: source.spouse_mother,
  conjMesmoEndereco: source.same_address_as_owner,
  conjEstado: source.spouse_state,
  conjIdCidade: source.spouse_idCidade,
  conjIdBairro: source.spouse_idBairro,
  conjLogradouro: source.spouse_street,
  conjNumero: source.spouse_number,
  conjCep: source.spouse_zip_code,
  conjApto: source.spouse_apartment,
  conjFixo: source.spouse_phone,
  conjCelular: source.spouse_cellphone,
  conjFax: source.spouse_fax,
  conjEmail: source.spouse_email,
  conjEmail2: source.spouse_email2,
  conjSpc: source.spouse_credit_analysis,
  conjSpcEntrada: source.spouse_credit_analysis_entry,
  conjSpcSaida: source.spouse_credit_analysis_exit,
  conjSpcValor: source.spouse_credit_analysis_value,
  conjObs: source.spouse_notes,
  foto: source.photo,
  fotoMini: source.thumbnail,
  created_at: source.created_at,
  updated_at: source.updated_at
} as T);

export const ownerParsePayloadPtToEn = <T>(source: any) => ({
  client_id: source.client_id,
  city_id: source.city_id,
  neighborhood_id: source.neighborhood_id,
  owner_id: source.idProprietario,
  name_or_company: source.nomeRazao,
  cpf_or_cnpj: source.cpfCnpj,
  rg: source.rg,
  driver_license: source.cnh,
  person_type: source.pessoa,
  state_registration: source.inscricaoEstadual,
  gender: source.sexo,
  marital_status: source.estadoCivil,
  birth_date: source.dataNascimento,
  place_of_birth: source.naturalidade,
  profession: source.profissao,
  income: source.renda,
  state: source.estado,
  idCidade: source.idCidade,
  idBairro: source.idBairro,
  street: source.logradouro,
  number: source.numero,
  zip_code: source.cep,
  apartment: source.apto,
  phone: source.fixo,
  cellphone: source.celular,
  fax: source.fax,
  email: source.email,
  email2: source.email2,
  notes: source.obs,
  spouse_name: source.conjNome,
  spouse_cpf: source.conjCpf,
  spouse_rg: source.conjRg,
  spouse_driver_license: source.conjCnh,
  spouse_birth_date: source.conjDataNascimento,
  spouse_place_of_birth: source.conjNaturalidade,
  spouse_profession: source.conjProfissao,
  spouse_income: source.conjRenda,
  spouse_father: source.conjPai,
  spouse_mother: source.conjMae,
  same_address_as_owner: source.conjMesmoEndereco,
  spouse_state: source.conjEstado,
  spouse_idCidade: source.conjIdCidade,
  spouse_idBairro: source.conjIdBairro,
  spouse_street: source.conjLogradouro,
  spouse_number: source.conjNumero,
  spouse_zip_code: source.conjCep,
  spouse_apartment: source.conjApto,
  spouse_phone: source.conjFixo,
  spouse_cellphone: source.conjCelular,
  spouse_fax: source.conjFax,
  spouse_email: source.conjEmail,
  spouse_email2: source.conjEmail2,
  spouse_credit_analysis: source.conjSpc,
  spouse_credit_analysis_entry: source.conjSpcEntrada,
  spouse_credit_analysis_exit: source.conjSpcSaida,
  spouse_credit_analysis_value: source.conjSpcValor,
  spouse_notes: source.conjObs,
  photo: source.foto,
  thumbnail: source.fotoMini,
})