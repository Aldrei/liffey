// Import Sequelize and necessary types
import db from '@/database/instance';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the themes model
export interface ITheme {
  id: number;
  name: string;
  description: string;
  src: string;
  created_at: Date;
  updated_at: Date;
}

// Define the Themes model with the interface and extend Model
interface ThemesModel extends Model<ITheme>, ITheme {}

// Define the themes table
export const Themes = db.define<ThemesModel>('Themes', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  src: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'themes',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const ThemesSetup = {
  syncTable: async () => await Themes.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    //...

    // Database level.
    await db.query(`
      ALTER TABLE themes
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })
  }
}

// No foreign key associations specified in the provided SQL
