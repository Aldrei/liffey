// Import Sequelize and necessary types
import db from '@/database/instance';
import { PaypalWebProfile } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the plans model
export interface IPlan {
  id?: number;
  paypal_web_profile_id: number | null;
  name: string;
  description: string;
  value: number;
  period: number;
  created_at?: Date;
  updated_at?: Date;
}

// Define the Plan model with the interface and extend Model
interface PlanModel extends Model<IPlan>, IPlan {}

// Define the plans table
export const Plans = db.define<PlanModel>('Plan', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  paypal_web_profile_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  period: {
    type: DataTypes.SMALLINT,
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
  tableName: 'plans',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const PlansSetup = {
  syncTable: async () => await Plans.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    Plans.belongsTo(PaypalWebProfile, { foreignKey: 'paypal_web_profile_id', onDelete: 'CASCADE' });

    // Database level.
    await db.query(`
      ALTER TABLE plans
      ADD KEY plans_paypal_web_profile_id_foreign (paypal_web_profile_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE plans
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE plans
      ADD CONSTRAINT plans_paypal_web_profile_id_foreign FOREIGN KEY (paypal_web_profile_id) REFERENCES paypal_web_profiles (id) ON DELETE CASCADE;
    `, { raw: true })
  }
}
