// Import Sequelize and necessary types
import db from '@/database/instance';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the migrations model
export interface IMigration {
  migration: string;
  batch: number;
}

// Define the Migration model with the interface and extend Model
interface MigrationModel extends Model<IMigration>, IMigration {}

// Define the migrations table
export const Migration = db.define<MigrationModel>('Migration', {
  migration: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  batch: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'migrations',
  timestamps: false,
  collate: 'utf8_unicode_ci', // Add collate at the table level
  // primaryKey: true,
});
