// Import Sequelize and necessary types
import db from '@/database/instance';
import { Properties } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the videos model
export interface IVideo {
  id: number;
  property_id: number;
  src: string;
  caption: string | null;
  order: number | null;
  created_at: Date | null;
  updated_at: Date | null;
}

// Define the Videos model with the interface and extend Model
interface VideosModel extends Model<IVideo>, IVideo {}

// Define the videos table
export const Videos = db.define<VideosModel>('Videos', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  property_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  src: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  caption: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  order: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'videos',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const VideosSetup = {
  syncTable: async () => await Videos.sync({ force: true }),
  syncAssociations: async () => {
    // Application level.
    Videos.belongsTo(Properties, {
      foreignKey: 'property_id',
      onDelete: 'CASCADE',
    });
    Properties.hasMany(Videos, { foreignKey: 'property_id' })
  },
  syncRelationships: async () => {
    // Application level.
    Videos.belongsTo(Properties, {
      foreignKey: 'property_id',
      onDelete: 'CASCADE',
    });

    // Database level.
    await db.query(`
      ALTER TABLE videos
      ADD KEY videos_property_id_foreign (property_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE videos
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE videos
      ADD CONSTRAINT videos_property_id_foreign FOREIGN KEY (property_id) REFERENCES properties (id) ON DELETE CASCADE;
    `, { raw: true })
  }
}
