// Import Sequelize and necessary types
import db from '@/database/instance';
import { Clients } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the domains model
export interface IDomain {
  id?: number;
  client_id: number;
  creator?: 'client' | 'imobmobile' | null;
  name: string;
  status: 'pre_verificado' | 'contratar' | 'contratado' | 'verificado_disponivel' | 'verificado_indisponivel' | 'contratar_cancelado' | 'contratar_cancelado_indisponivel';
  verified_at?: Date | null;
  created_at?: Date;
  updated_at?: Date;
}

// Define the Domain model with the interface and extend Model
interface DomainModel extends Model<IDomain>, IDomain {}

// Define the domains table
export const Domains = db.define<DomainModel>('Domain', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  client_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  creator: {
    type: DataTypes.ENUM('client', 'imobmobile'),
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      'pre_verificado',
      'contratar',
      'contratado',
      'verificado_disponivel',
      'verificado_indisponivel',
      'contratar_cancelado',
      'contratar_cancelado_indisponivel'
    ),
    allowNull: false,
  },
  verified_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
    onUpdate: 'CURRENT_TIMESTAMP',
  },
}, {
  tableName: 'domains',
  timestamps: true,
  collate: 'utf8_unicode_ci', // Add collate at the table level
});

export const DomainsSetup = {
  syncTable: async () => await Domains.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    Domains.belongsTo(Clients, { foreignKey: 'client_id', onDelete: 'CASCADE' });

    // Database level.
    await db.query(`
      ALTER TABLE domains
      ADD KEY domains_client_id_foreign (client_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE domains
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE domains
      ADD CONSTRAINT domains_client_id_foreign FOREIGN KEY (client_id) REFERENCES clients (id);
    `, { raw: true })
  }
}
