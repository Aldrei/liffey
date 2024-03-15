// Import Sequelize and necessary types
import db from '@/database/instance';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the palettes model
export interface IPalette {
  id?: number;
  name: string;
  description: string;
  src: string;
  created_at?: Date;
  updated_at?: Date;
}

// Define the Palette model with the interface and extend Model
interface PaletteModel extends Model<IPalette>, IPalette {}

// Define the palettes table
export const Palettes = db.define<PaletteModel>('Palette', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  src: {
    type: DataTypes.STRING,
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
  tableName: 'palettes',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const PalettesSetup = {
  syncTable: async () => await Palettes.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    // ...

    // Database level.
    await db.query(`
      ALTER TABLE palettes
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })
  }
}