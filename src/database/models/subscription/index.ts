// Import Sequelize and necessary types
import db from '@/database/instance';
import { Clients, Orders, Plans } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the subscriptions model
export interface ISubscription {
  id: number;
  client_id: number;
  plan_id: number | null;
  order_id: number | null;
  expires_at: Date;
  canceled_at: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
}

// Define the Subscriptions model with the interface and extend Model
interface SubscriptionsModel extends Model<ISubscription>, ISubscription {}

// Define the subscriptions table
export const Subscriptions = db.define<SubscriptionsModel>('Subscriptions', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  client_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  plan_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  order_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  canceled_at: {
    type: DataTypes.DATE,
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
  tableName: 'subscriptions',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const SubscriptionsSetup = {
  syncTable: async () => await Subscriptions.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    Subscriptions.belongsTo(Clients, { foreignKey: 'client_id' });
    Subscriptions.belongsTo(Plans, { foreignKey: 'plan_id' });
    Subscriptions.belongsTo(Orders, { foreignKey: 'order_id' });

    // Database level.
    await db.query(`
      ALTER TABLE subscriptions
      ADD KEY subscriptions_plan_id_foreign (plan_id),
      ADD KEY subscriptions_order_id_foreign (order_id),
      ADD KEY subscriptions_client_id_foreign (client_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE subscriptions
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE subscriptions
      ADD CONSTRAINT subscriptions_client_id_foreign FOREIGN KEY (client_id) REFERENCES clients (id),
      ADD CONSTRAINT subscriptions_order_id_foreign FOREIGN KEY (order_id) REFERENCES orders (id),
      ADD CONSTRAINT subscriptions_plan_id_foreign FOREIGN KEY (plan_id) REFERENCES plans (id);
    `, { raw: true })
  }
}
