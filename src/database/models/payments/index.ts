// Import Sequelize and necessary types
import db from '@/database/instance';
import { Clients, PaymentsCategories } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the payments model
export interface IPayment {
  id?: number;
  payment_category_id: number;
  client_id: number;
  valor: number | null;
  descricao: string;
  quantidade: number | null;
  pago: boolean | null;
  pago_at: Date | null;
  created_at?: Date;
  updated_at?: Date;
}

// Define the Payment model with the interface and extend Model
interface PaymentModel extends Model<IPayment>, IPayment {}

// Define the payments table
export const Payments = db.define<PaymentModel>('Payment', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  payment_category_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  client_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  pago: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  pago_at: {
    type: DataTypes.DATE,
    allowNull: true,
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
  tableName: 'payments',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const PaymentsSetup = {
  syncTable: async () => await Payments.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    Payments.belongsTo(Clients, { foreignKey: 'client_id', onDelete: 'CASCADE' });
    Payments.belongsTo(PaymentsCategories, { foreignKey: 'payment_category_id' });

    // Database level.
    await db.query(`
      ALTER TABLE payments
      ADD KEY payments_client_id_foreign (client_id),
      ADD KEY payments_payments_categories_id_foreign (payment_category_id); 
    `, { raw: true })

    await db.query(`
      ALTER TABLE payments
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE payments
      ADD CONSTRAINT payments_client_id_foreign FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE,
      ADD CONSTRAINT payments_payments_categories_id_foreign FOREIGN KEY (payment_category_id) REFERENCES payments_categories (id);
    `, { raw: true })
  }
}
