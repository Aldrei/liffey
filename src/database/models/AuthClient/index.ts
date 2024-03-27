import db from "@/database/instance";
import { DataTypes, Model } from "sequelize";

interface IAuthClient {
  id: number;
  secret: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface AuthClientModel extends Model<IAuthClient>, IAuthClient {}

export const AuthClients = db.define<AuthClientModel>('AuthClient', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  secret: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
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
  }
}, {
  tableName: 'auth_clients',
  collate: 'utf8_unicode_ci',
  timestamps: false
})

export const AuthClientsSetup = {
  syncTable: async () => await AuthClients.sync({ force: true }),
  syncAssociations: async () => {
    // Application level.
  },
  syncRelationships: async () => {
    // Database level.
    await db.query(`
      ALTER TABLE auth_clients
      ADD UNIQUE KEY auth_tokens_secret_unique (secret);
    `, { raw: true })

    await db.query(`
      ALTER TABLE auth_clients
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })
  }
}