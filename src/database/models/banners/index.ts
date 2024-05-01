import db from '@/database/instance'; // Replace with your actual path to the Sequelize instance
import { DataTypes, Model } from 'sequelize';
import { Clients } from '../clients';
import { IProperty, Properties } from '../properties';

// Define the interface for the banner model
// Define the interface for the banner model
export interface IBanner {
  id?: number;
  client_id?: number | null;
  property_id: number;
  title?: string | null;
  subtitle?: string | null;
  summary?: string | null;
  general_description?: string | null;
  img: string;
  thumb: string;
  link: string;
  position: number;
  created_at?: Date;
  updated_at?: Date;
  Property?: IProperty
}


// Define the Banner model with the interface and extend Model
interface BannerModel extends Model<IBanner>, IBanner {}

export const Banners = db.define<BannerModel>('Banner', {
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
    defaultValue: null
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  summary: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  general_description: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: ''
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  thumb: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
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
  tableName: 'banners',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const BannersSetup = {
  syncTable: async () => await Banners.sync({ force: true }),
  syncAssociations: async () => {
    // Application level.
    Banners.belongsTo(Clients, { foreignKey: 'client_id', onDelete: 'CASCADE' });
    Banners.belongsTo(Properties, { foreignKey: 'property_id', onDelete: 'CASCADE' });
  },
  syncRelationships: async () => {
    // Database level.
    await db.query(`
      ALTER TABLE banners
      ADD KEY banners_property_id_foreign (property_id),
      ADD KEY banners_client_id_foreign (client_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE banners
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE banners
      ADD CONSTRAINT banners_client_id_foreign FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE,
      ADD CONSTRAINT banners_property_id_foreign FOREIGN KEY (property_id) REFERENCES properties (id) ON DELETE CASCADE;
    `, { raw: true })
  }
}
