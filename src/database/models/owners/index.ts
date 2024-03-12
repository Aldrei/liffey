// Import Sequelize and necessary types
import db from '@/database/instance';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the owners model
export interface IOwner {
  id?: number;
  client_id: number | null;
  city_id: number | null;
  neighborhood_id: number | null;
  idProprietario: string;
  nomeRazao: string;
  cpfCnpj: string;
  rg: string;
  cnh: string;
  pessoa: string;
  inscricaoEstadual: string;
  sexo: string;
  estadoCivil: string;
  dataNascimento: Date | null;
  naturalidade: string;
  profissao: string;
  renda: number | null;
  estado: string;
  idCidade: string;
  idBairro: string;
  logradouro: string;
  numero: string;
  cep: string;
  apto: string;
  fixo: string;
  celular: string;
  fax: string;
  email: string;
  email2: string;
  obs: string;
  conjNome: string;
  conjCpf: string;
  conjRg: string;
  conjCnh: string;
  conjDataNascimento: string;
  conjNaturalidade: string;
  conjProfissao: string;
  conjRenda: string;
  conjPai: string;
  conjMae: string;
  conjMesmoEndereco: string;
  conjEstado: string;
  conjIdCidade: string;
  conjIdBairro: string;
  conjLogradouro: string;
  conjNumero: string;
  conjCep: string;
  conjApto: string;
  conjFixo: string;
  conjCelular: string;
  conjFax: string;
  conjEmail: string;
  conjEmail2: string;
  conjSpc: string;
  conjSpcEntrada: string;
  conjSpcSaida: string;
  conjSpcValor: string;
  conjObs: string;
  foto: string;
  fotoMini: string;
  created_at?: Date;
  updated_at?: Date;
}

// Define the Owner model with the interface and extend Model
interface OwnerModel extends Model<IOwner>, IOwner {}

// Define the owners table
export const Owners = db.define<OwnerModel>('Owner', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  client_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  city_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  neighborhood_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  idProprietario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nomeRazao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpfCnpj: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnh: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pessoa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inscricaoEstadual: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estadoCivil: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataNascimento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  naturalidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profissao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  renda: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idCidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idBairro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logradouro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fixo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  celular: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fax: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  obs: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjNome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjCpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjRg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjCnh: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjDataNascimento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjNaturalidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjProfissao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjRenda: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjPai: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjMae: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjMesmoEndereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjEstado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjIdCidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjIdBairro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjLogradouro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjNumero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjCep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjApto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjFixo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjCelular: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjFax: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjEmail2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjSpc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjSpcEntrada: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjSpcSaida: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjSpcValor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  conjObs: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fotoMini: {
    type: DataTypes.STRING,
    allowNull: false,
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
  tableName: 'owners',
  timestamps: true,
  collate: 'utf8_unicode_ci', // Add collate at the table level
});

export const OwnersSetup = {
  syncTable: async () => await Owners.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    Owners.belongsTo(db.models.City, { foreignKey: 'city_id' });
    Owners.belongsTo(db.models.Client, { foreignKey: 'client_id', onDelete: 'CASCADE' });
    Owners.belongsTo(db.models.Neighborhood, { foreignKey: 'neighborhood_id' });

    // Database level.
    await db.query(`
      ALTER TABLE owners
      ADD KEY owners_neighborhood_id_foreign (neighborhood_id),
      ADD KEY owners_city_id_foreign (city_id),
      ADD KEY owners_client_id_foreign (client_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE owners
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE owners
      ADD CONSTRAINT owners_city_id_foreign FOREIGN KEY (city_id) REFERENCES cities (id),
      ADD CONSTRAINT owners_client_id_foreign FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE,
      ADD CONSTRAINT owners_neighborhood_id_foreign FOREIGN KEY (neighborhood_id) REFERENCES neighborhoods (id);
    `, { raw: true })
  }
}
