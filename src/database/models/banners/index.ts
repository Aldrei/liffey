import db from '@/database/instance'; // Replace with your actual path to the Sequelize instance
import { DataTypes, Model } from 'sequelize';

// Define the interface for the banner model
export interface IBanner {
  id?: number;
  client_id?: number | null;
  property_id: number;
  titulo?: string | null;
  subtitulo?: string | null;
  resenha?: string | null;
  descGeral?: string | null;
  img: string;
  imgMini: string;
  link: string;
  posicao: number;
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
  titulo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subtitulo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resenha: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descGeral: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imgMini: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  posicao: {
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
  timestamps: true,
  createdAt: false,
  updatedAt: 'updateTimestamp',
  collate: 'utf8_unicode_ci', // Add collate at the table level
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
