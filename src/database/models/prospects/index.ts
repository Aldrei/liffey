// Import Sequelize and necessary types
import db from '@/database/instance';
import { Clients, Properties } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the prospects model
export interface IProspects {
  id?: number;
  client_id: number;
  property_id?: number | null;
  status: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  whats?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

// Define the Prospects model with the interface and extend Model
interface ProspectsModel extends Model<IProspects>, IProspects {}

// Define the prospects table
export const Prospects = db.define<ProspectsModel>('Prospects', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  client_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  property_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  whats: {
    type: DataTypes.STRING(20),
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
  tableName: 'prospects',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const ProspectsSetup = {
  syncTable: async () => await Prospects.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    Prospects.belongsTo(Clients, { foreignKey: 'client_id', onDelete: 'CASCADE' });
    Prospects.belongsTo(Properties, { foreignKey: 'property_id', onDelete: 'CASCADE' });

    // Database level.
    await db.query(`
      ALTER TABLE prospects
      ADD KEY email (email),
      ADD KEY prospects_client_id_foreign (client_id),
      ADD KEY property_id (property_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE prospects
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE prospects
      ADD CONSTRAINT prospects_client_id_foreign FOREIGN KEY (client_id) REFERENCES clients (id),
      ADD CONSTRAINT prospects_property_id_foreign FOREIGN KEY (property_id) REFERENCES properties (id);
    `, { raw: true })
  }
}
