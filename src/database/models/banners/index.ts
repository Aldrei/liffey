import db from '@/database/instance'; // Replace with your actual path to the Sequelize instance
import { DataTypes, Model } from 'sequelize';

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
    allowNull: true,
  },
  property_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  summary: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  general_description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumb: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
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
  tableName: 'banners',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const BannersSetup = {
  syncTable: async () => await Banners.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    Banners.belongsTo(db.models.Client, { foreignKey: 'client_id', onDelete: 'CASCADE' });
    Banners.belongsTo(db.models.Property, { foreignKey: 'property_id', onDelete: 'CASCADE' });

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
