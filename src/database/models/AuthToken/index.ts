import db from "@/database/instance";
import { DataTypes, Model } from "sequelize";
import { AuthClients } from "../AuthClient";

interface IAuthToken {
  id: number;
  auth_client_id: number;
  user_id: number;
  session_id: string;
  expire_time: Date;
  token: string;
  created_at: Date;
  updated_at: Date;
}

interface AuthTokensModel extends Model<IAuthToken>, IAuthToken {}

export const AuthTokens = db.define<AuthTokensModel>('AuthToken', {
  id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
  },
  auth_client_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true
  },
  session_id: {
      type: DataTypes.STRING,
      allowNull: true
  },
  expire_time: {
      type: DataTypes.DATE,
      allowNull: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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
  tableName: 'auth_tokens',
  collate: 'utf8_unicode_ci',
  timestamps: false,
})

export const AuthTokensSetup = {
  syncTable: async () => await AuthTokens.sync({ force: true }),
  syncAssociations: async () => {
    // Application level.
    AuthTokens.belongsTo(AuthClients, { foreignKey: 'auth_client_id' })
  },
  syncRelationships: async () => {
    // Database level.
    await db.query(`
      ALTER TABLE auth_tokens
      ADD UNIQUE KEY auth_tokens_token_unique (token),
      ADD KEY auth_tokens_auth_client_id_foreign (auth_client_id),
      ADD KEY auth_tokens_user_id_foreign (user_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE auth_tokens
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE auth_tokens
      ADD CONSTRAINT auth_tokens_auth_client_id_foreign FOREIGN KEY (auth_client_id) REFERENCES auth_clients (id),
      ADD CONSTRAINT auth_tokens_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id);
    `, { raw: true })
  }
}