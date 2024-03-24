// Import Sequelize and necessary types
import db from '@/database/instance';
import { DataTypes, Model } from 'sequelize';
import { Properties } from '../properties';

// Define the interface for the photos model
export interface IPhoto {
  id?: number;
  property_id: number;
  type: string | null;
  src: string;
  thumb: string | null;
  main_media: string | null;
  caption: string | null;
  order: number | null;
  rotate: number | null;
  created_at?: Date;
  updated_at?: Date;
}

// Define the Photo model with the interface and extend Model
interface PhotoModel extends Model<IPhoto>, IPhoto {}

// Define the photos table
export const Photos = db.define<PhotoModel>('Photo', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  property_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  src: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumb: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  main_media: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  caption: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  order: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  rotate: {
    type: DataTypes.SMALLINT,
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
  tableName: 'photos',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const PhotosSetup = {
  syncTable: async () => await Photos.sync({ force: true }),
  syncAssociations: async () => {
    // Application level.
    Photos.belongsTo(Properties, { foreignKey: 'property_id', onDelete: 'CASCADE' });
    Properties.hasMany(Photos, { foreignKey: 'property_id' })
  },
  syncRelationships: async () => {
    // Database level.
    await db.query(`
      ALTER TABLE photos
      ADD KEY photos_property_id_foreign (property_id); 
    `, { raw: true })

    await db.query(`
      ALTER TABLE photos
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE photos
      ADD CONSTRAINT photos_property_id_foreign FOREIGN KEY (property_id) REFERENCES properties (id) ON DELETE CASCADE;
    `, { raw: true })
  }
}
