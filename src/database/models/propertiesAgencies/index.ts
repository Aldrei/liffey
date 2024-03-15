// Import Sequelize and necessary types
import db from '@/database/instance';
import { Clients } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the properties_agencies model
export interface IPropertiesAgencies {
  id?: number;
  client_id: number;
  owner: string;
  owner_phone: string;
  owner_email?: string | null;
  state: string;
  city: string;
  neighborhood: string;
  address: string;
  type: string;
  bedrooms: string;
  garage: string;
  laundry?: boolean | null;
  alarm?: boolean | null;
  elevator?: boolean | null;
  electronic_gate?: boolean | null;
  artesian_well?: boolean | null;
  electric_fence?: boolean | null;
  video_camera?: boolean | null;
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
  owner_phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  owner_email: {
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
  type: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  bedrooms: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  garage: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  laundry: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  alarm: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  elevator: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  electronic_gate: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  artesian_well: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  electric_fence: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  video_camera: {
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
  collate: 'utf8_unicode_ci',
  timestamps: false,
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
