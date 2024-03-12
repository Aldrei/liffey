// Import Sequelize and necessary types
import db from '@/database/instance';
import { Cities, Clients, Employees, Neighborhoods, Owners } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the properties model
export interface IProperty {
  id?: number;
  client_id: number;
  city_id: number | null;
  neighborhood_id: number | null;
  owner_id: number | null;
  agent_id: number | null;
  broker_id: number | null;
  code: number | null;
  codeTipo: number | null;
  codePretty: string | null;
  nomeImovel: string | null;
  matricula: string | null;
  lote: string | null;
  quadra: string | null;
  empreendimento: number | null;
  placa: number | null;
  possuiFoto: number | null;
  exclusividade: number | null;
  exclusividadePeriodoInicio: Date | null;
  exclusividadePeriodoFim: Date | null;
  finalidade: string | null;
  categoria: string | null;
  tipo: string | null;
  status: string | null;
  aluguelPeriodoInicio: Date | null;
  aluguelPeriodoFim: Date | null;
  dormitorio: string | null;
  garagem: string | null;
  lavanderia: number | null;
  telhado: string | null;
  forro: string | null;
  piso: string | null;
  aberturas: string | null;
  alarme: number | null;
  portaoEletronico: number | null;
  pocoArtesiano: number | null;
  cercaEletrica: number | null;
  cameraDeVideo: number | null;
  nascerDoSol: string | null;
  descGeral: string | null;
  dataAgenciamento: Date | null;
  dataVenda: Date | null;
  apNomeCondominio: string | null;
  apPredio: string | null;
  apPavimento: string | null;
  apTotalPavimentos: string | null;
  apApto: string | null;
  apElevador: number | null;
  areaTotal: number | null;
  areaConstruida: number | null;
  areaFrente: number | null;
  areaFundos: number | null;
  areaDireita: number | null;
  areaEsquerda: number | null;
  valor: number | null;
  valorCondicaoDeComissao: string | null;
  valorPorcentagemDeComissao: number | null;
  valorPorcentagemDoCorretor: number | null;
  valorPorcentagemDoAgenciador: number | null;
  valorCondominio: number | null;
  valorIPTUPago: string | null;
  valorIPTU: number | null;
  valorInssPago: string | null;
  valorInss: number | null;
  valorIndiceDoCUB: number | null;
  valorAlgoParaRegularizar: string | null;
  valorAlgoParaRegularizarDesc: string | null;
  condAgente: string | null;
  condPrestacao: string | null;
  condSaldoDevedor: string | null;
  condPrazo: string | null;
  condReajuste: string | null;
  condFGTS: number | null;
  condDoacao: number | null;
  condFinanciamento: number | null;
  condCartaConsorcio: number | null;
  condPartePermuta: number | null;
  condSituacao: string | null;
  condObs: string | null;
  localEstado: string | null;
  localIdCidade: string | null;
  localIdBairro: string | null;
  localLogradouro: string | null;
  localNumero: string | null;
  localCEP: string | null;
  localImediacoes: string | null;
  latitude: string | null;
  longitude: string | null;
  zoom: number | null;
  sitePublicarImovel: number | null;
  sitePublicarValor: number | null;
  siteImovelDestaque: number | null;
  siteAcesso: string | null;
  sitePublicarMapa: number | null;
  videoURL: string | null;
  idUltimaTransacao: string | null;
  created_at?: Date;
  updated_at?: Date;
}

// Define the Property model with the interface and extend Model
interface PropertyModel extends Model<IProperty>, IProperty {}

// Define the properties table
export const Properties = db.define<PropertyModel>('Property', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  client_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  city_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  neighborhood_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  owner_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  agent_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  broker_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  code: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  codeTipo: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  codePretty: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  nomeImovel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  matricula: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lote: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quadra: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  empreendimento: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
  placa: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
  possuiFoto: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
  exclusividade: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
  exclusividadePeriodoInicio: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  exclusividadePeriodoFim: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  finalidade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  aluguelPeriodoInicio: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  aluguelPeriodoFim: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  dormitorio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  garagem: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lavanderia: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
  telhado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  forro: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  piso: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  aberturas: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  alarme: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
  portaoEletronico: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
  pocoArtesiano: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
  cercaEletrica: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
  cameraDeVideo: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
  nascerDoSol: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descGeral: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dataAgenciamento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  dataVenda: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  apNomeCondominio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  apPredio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  apPavimento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  apTotalPavimentos: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  apApto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  apElevador: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
  areaTotal: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  areaConstruida: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  areaFrente: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  areaFundos: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  areaDireita: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  areaEsquerda: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  valor: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  valorCondicaoDeComissao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  valorPorcentagemDeComissao: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  valorPorcentagemDoCorretor: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  valorPorcentagemDoAgenciador: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  valorCondominio: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  valorIPTUPago: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  valorIPTU: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  valorInssPago: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  valorInss: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  valorIndiceDoCUB: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  valorAlgoParaRegularizar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  valorAlgoParaRegularizarDesc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  condAgente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  condPrestacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  condSaldoDevedor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  condPrazo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  condReajuste: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  condFGTS: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  condDoacao: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  condFinanciamento: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  condCartaConsorcio: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  condPartePermuta: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  condSituacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  condObs: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  localEstado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  localIdCidade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  localIdBairro: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  localLogradouro: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  localNumero: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  localCEP: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  localImediacoes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  zoom: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  sitePublicarImovel: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  sitePublicarValor: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  siteImovelDestaque: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  siteAcesso: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sitePublicarMapa: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  videoURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idUltimaTransacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    onUpdate: 'CURRENT_TIMESTAMP',
  },
}, {
  tableName: 'properties',
  timestamps: false, // No timestamps for this table
  collate: 'utf8_unicode_ci', // Add collate at the table level
});

export const PropertiesSetup = {
  syncTable: async () => await Properties.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    Properties.belongsTo(Employees, { foreignKey: 'agent_id', onDelete: 'SET NULL' });
    Properties.belongsTo(Employees, { foreignKey: 'broker_id', onDelete: 'SET NULL' });
    Properties.belongsTo(Cities, { foreignKey: 'city_id', onDelete: 'SET NULL' });
    Properties.belongsTo(Clients, { foreignKey: 'client_id', onDelete: 'CASCADE' });
    Properties.belongsTo(Neighborhoods, { foreignKey: 'neighborhood_id', onDelete: 'SET NULL' });
    Properties.belongsTo(Owners, { foreignKey: 'owner_id', onDelete: 'SET NULL' });

    // Database level.
    await db.query(`
      ALTER TABLE properties
      ADD KEY properties_broker_id_foreign (broker_id),
      ADD KEY properties_agent_id_foreign (agent_id),
      ADD KEY properties_owner_id_foreign (owner_id),
      ADD KEY properties_neighborhood_id_foreign (neighborhood_id),
      ADD KEY properties_city_id_foreign (city_id),
      ADD KEY properties_client_id_foreign (client_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE properties
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE properties
      ADD CONSTRAINT properties_agent_id_foreign FOREIGN KEY (agent_id) REFERENCES employees (id),
      ADD CONSTRAINT properties_broker_id_foreign FOREIGN KEY (broker_id) REFERENCES employees (id),
      ADD CONSTRAINT properties_city_id_foreign FOREIGN KEY (city_id) REFERENCES cities (id),
      ADD CONSTRAINT properties_client_id_foreign FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE,
      ADD CONSTRAINT properties_neighborhood_id_foreign FOREIGN KEY (neighborhood_id) REFERENCES neighborhoods (id),
      ADD CONSTRAINT properties_owner_id_foreign FOREIGN KEY (owner_id) REFERENCES owners (id);
    `, { raw: true })
  }
}
