// Import Sequelize and necessary types
import db from '@/database/instance';
import { Clients, ReceivablesCategories } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the receivables model
export interface IReceivables {
  id?: number;
  receivable_category_id: number;
  client_id: number;
  valor?: number | null;
  descricao: string;
  quantidade?: number | null;
  recebido?: boolean | null;
  recebido_at?: Date | null;
  created_at?: Date;
  updated_at?: Date;
}

// Define the Receivables model with the interface and extend Model
interface ReceivablesModel extends Model<IReceivables>, IReceivables {}

// Define the receivables table
export const Receivables = db.define<ReceivablesModel>('Receivables', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  receivable_category_id: {
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
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  recebido: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  recebido_at: {
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
  tableName: 'receivables',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const ReceivablesSetup = {
  syncTable: async () => await Receivables.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    Receivables.belongsTo(Clients, { foreignKey: 'client_id', onDelete: 'CASCADE' });
    Receivables.belongsTo(ReceivablesCategories, { foreignKey: 'receivable_category_id', onDelete: 'CASCADE' });

    // Database level.
    await db.query(`
      ALTER TABLE receivables
      ADD KEY receivables_client_id_foreign (client_id),
      ADD KEY receivables_receivable_category_id_foreign (receivable_category_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE receivables
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE receivables
      ADD CONSTRAINT receivables_client_id_foreign FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE,
      ADD CONSTRAINT receivables_receivable_category_id_foreign FOREIGN KEY (receivable_category_id) REFERENCES receivables_categories (id);
    `, { raw: true })
  }
}
