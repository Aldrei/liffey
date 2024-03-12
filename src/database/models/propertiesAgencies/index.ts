// Import Sequelize and necessary types
import db from '@/database/instance';
import { Clients } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the properties_agency model
export interface IPropertiesAgencies {
  id?: number;
  client_id: number;
  owner: string;
  ownerPhone: string;
  ownerEmail?: string | null;
  state: string;
  city: string;
  neighborhood: string;
  address: string;
  tipo: string;
  dormitorio: string;
  garagem: string;
  lavanderia?: boolean | null;
  alarme?: boolean | null;
  elevador?: boolean | null;
  portaoEletronico?: boolean | null;
  pocoArtesiano?: boolean | null;
  cercaEletrica?: boolean | null;
  cameraDeVideo?: boolean | null;
  created_at?: Date;
  updated_at?: Date;
}

// Define the PropertiesAgencies model with the interface and extend Model
interface PropertiesAgenciesModel extends Model<IPropertiesAgencies>, IPropertiesAgencies {}

// Define the properties_agency table
export const PropertiesAgencies = db.define<PropertiesAgenciesModel>('PropertiesAgencies', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  client_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  owner: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  ownerPhone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  ownerEmail: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  neighborhood: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  dormitorio: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  garagem: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lavanderia: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  alarme: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  elevador: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  portaoEletronico: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  pocoArtesiano: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  cercaEletrica: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  cameraDeVideo: {
    type: DataTypes.BOOLEAN,
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
  tableName: 'properties_agencies',
  timestamps: true,
  collate: 'utf8_unicode_ci', // Add collate at the table level
});

export const PropertiesAgenciesSetup = {
  syncTable: async () => await PropertiesAgencies.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    PropertiesAgencies.belongsTo(Clients, { foreignKey: 'client_id', onDelete: 'CASCADE' });

    // Database level.
    await db.query(`
      ALTER TABLE properties_agencies
      ADD KEY properties_agencies_client_id_foreign (client_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE properties_agencies
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE properties_agencies
      ADD CONSTRAINT properties_agencies_client_id_foreign FOREIGN KEY (client_id) REFERENCES clients (id);
    `, { raw: true })
  }
}
