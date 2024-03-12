// Import Sequelize and necessary types
import db from '@/database/instance';
import { Clients } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the emails model
export interface IEmail {
  id?: number;
  client_id: number;
  name: string;
  status: 'solicitado' | 'ativo' | 'desativado' | 'ativar' | 'desativar' | 'deletar' | 'deletado';
  password_temp: string;
  created_at?: Date;
  updated_at?: Date;
}

// Define the Email model with the interface and extend Model
interface EmailModel extends Model<IEmail>, IEmail {}

// Define the emails table
export const Emails = db.define<EmailModel>('Emails', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  client_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('solicitado', 'ativo', 'desativado', 'ativar', 'desativar', 'deletar', 'deletado'),
    allowNull: false,
  },
  password_temp: {
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
    defaultValue: DataTypes.NOW,
    onUpdate: 'CURRENT_TIMESTAMP',
  },
}, {
  tableName: 'emails',
  timestamps: true,
  collate: 'utf8_unicode_ci', // Add collate at the table level
});

export const EmailsSetup = {
  syncTable: async () => await Emails.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    Emails.belongsTo(Clients, { foreignKey: 'client_id', onDelete: 'CASCADE' });

    // Database level.
    await db.query(`
      ALTER TABLE emails
      ADD UNIQUE KEY emails_name_unique (name),
      ADD KEY emails_client_id_foreign (client_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE emails
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE emails
      ADD CONSTRAINT emails_client_id_foreign FOREIGN KEY (client_id) REFERENCES clients (id);
    `, { raw: true })
  }
}

// Define the foreign key association
// Emails.belongsTo(db.models.Client, { foreignKey: 'client_id', onDelete: 'CASCADE' });
