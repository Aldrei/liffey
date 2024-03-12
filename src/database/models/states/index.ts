// Import Sequelize and necessary types
import db from '@/database/instance';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the states model
export interface IState {
  id: number;
  name: string;
  abbr: string;
  created_at: Date | null;
  updated_at: Date | null;
}

// Define the States model with the interface and extend Model
interface StatesModel extends Model<IState>, IState {}

// Define the states table
export const States = db.define<StatesModel>('States', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  abbr: {
    type: DataTypes.STRING(2),
    allowNull: false,
    unique: true,
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
  tableName: 'states',
  timestamps: false,
  collate: 'utf8_unicode_ci', // Add collate at the table level
});

export const StatesSetup = {
  syncTable: async () => await States.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    // ...

    // Database level.
    await db.query(`
      ALTER TABLE states
      ADD UNIQUE KEY states_name_unique (name),
      ADD UNIQUE KEY states_abbr_unique (abbr);
    `, { raw: true })

    await db.query(`
      ALTER TABLE states
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })
  }
}
