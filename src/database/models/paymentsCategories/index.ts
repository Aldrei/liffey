// Import Sequelize and necessary types
import db from '@/database/instance';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the payments_categories model
export interface IPaymentsCategories {
  id?: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

// Define the PaymentsCategories model with the interface and extend Model
interface PaymentsCategoriesModel extends Model<IPaymentsCategories>, IPaymentsCategories {}

// Define the payments_categories table
export const PaymentsCategories = db.define<PaymentsCategoriesModel>('PaymentsCategories', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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
  tableName: 'payments_categories',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const PaymentsCategoriesSetup = {
  syncTable: async () => await PaymentsCategories.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    // ...

    // Database level.
    await db.query(`
      ALTER TABLE payments_categories
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `)
  }
}
