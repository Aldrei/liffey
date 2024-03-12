// Import Sequelize and necessary types
import db from '@/database/instance';
import { Users } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the orders model
export interface IOrder {
  id?: number;
  value: number;
  paypal_code_payment: string;
  user_id: number | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}

// Define the Order model with the interface and extend Model
interface OrderModel extends Model<IOrder>, IOrder {}

// Define the orders table
export const Orders = db.define<OrderModel>('Order', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  value: {
    type: DataTypes.DOUBLE(8, 2),
    allowNull: false,
  },
  paypal_code_payment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
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
  tableName: 'orders',
  timestamps: true,
  collate: 'utf8_unicode_ci', // Add collate at the table level
});

export const OrdersSetup = {
  syncTable: async () => await Orders.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    Orders.belongsTo(Users, { foreignKey: 'user_id' });

    // Database level.
    await db.query(`
      ALTER TABLE orders
      ADD KEY orders_user_id_foreign (user_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE orders
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE orders
      ADD CONSTRAINT orders_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id);
    `, { raw: true })
  }
}

// Define the foreign key association
// Orders.belongsTo(Users, { foreignKey: 'user_id' });
