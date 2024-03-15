// Import Sequelize and necessary types
import db from '@/database/instance';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the paypal_web_profiles model
export interface IPaypalWebProfile {
  id?: number;
  name: string;
  logo_url: string;
  paypal_code_web_profile: string;
  created_at?: Date;
  updated_at?: Date;
}

// Define the PaypalWebProfile model with the interface and extend Model
interface PaypalWebProfileModel extends Model<IPaypalWebProfile>, IPaypalWebProfile {}

// Define the paypal_web_profiles table
export const PaypalWebProfile = db.define<PaypalWebProfileModel>('PaypalWebProfile', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paypal_code_web_profile: {
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
  tableName: 'paypal_web_profiles',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const PaypalWebProfileSetup = {
  syncTable: async () => await PaypalWebProfile.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    // ...

    // Database level.
    await db.query(`
      ALTER TABLE paypal_web_profiles
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })
  }
}

// No foreign key associations defined for this table
