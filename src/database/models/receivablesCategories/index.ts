// Import Sequelize and necessary types
import db from '@/database/instance';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the receivables_categories model
export interface IReceivablesCategories {
  id?: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

// Define the ReceivablesCategories model with the interface and extend Model
interface ReceivablesCategoriesModel extends Model<IReceivablesCategories>, IReceivablesCategories {}

// Define the receivables_categories table
export const ReceivablesCategories = db.define<ReceivablesCategoriesModel>('ReceivablesCategories', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    onUpdate: 'CURRENT_TIMESTAMP',
  },
}, {
  tableName: 'receivables_categories',
  timestamps: true,
  collate: 'utf8_unicode_ci', // Add collate at the table level
});

export const ReceivablesCategoriesSetup = {
  syncTable: async () => await ReceivablesCategories.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    // ...

    // Database level.
    await db.query(`
      ALTER TABLE receivables_categories
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })
  }
}
