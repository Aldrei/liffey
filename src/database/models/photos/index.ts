// Import Sequelize and necessary types
import db from '@/database/instance';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the photos model
export interface IPhoto {
  id?: number;
  property_id: number;
  tipo: string | null;
  src: string;
  srcMini: string | null;
  midiaPrincipal: string | null;
  legenda: string | null;
  ordem: number | null;
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
  tipo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  src: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  srcMini: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  midiaPrincipal: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  legenda: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ordem: {
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
  syncRelationships: async () => {
    // Application level.
    Photos.belongsTo(db.models.Property, { foreignKey: 'property_id', onDelete: 'CASCADE' });

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
