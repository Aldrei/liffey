// Import Sequelize and necessary types
import db from '@/database/instance';
import { IRole, Roles } from '@/database/models/roles';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the users model
export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  password_temp: string;
  remember_token: string | null;
  token_push: string;
  created_at: Date;
  Roles?: IRole[]
  updated_at: Date;
  deleted_at: Date | null;
}

// Define the Users model with the interface and extend Model
export interface UsersModel extends Model<IUser>, IUser {}

// Define the users table
export const Users = db.define<UsersModel>('Users', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  /**
   * TODO:
   * 
   *  Was changed the SQL insert file(1.sql via db:insert command) to named columns because username was add after.
   * 
   *  INSERT INTO `users` (id, name, email, password, password_temp, remember_token, token_push, created_at, updated_at, deleted_at) ...
  */
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password_temp: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: '',
  },
  remember_token: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  token_push: {
    type: DataTypes.STRING(255),
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
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'users',
  paranoid: true,
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const UsersSetup = {
  syncTable: async () => await Users.sync({ force: true }),
  syncAssociations: async () => {
    // Application level.
    Users.belongsToMany(Roles, { through: 'role_user', foreignKey: 'user_id', timestamps: false })
  },
  syncRelationships: async () => {
    // Database level.
    await db.query(`
      ALTER TABLE users
      ADD UNIQUE KEY users_email_unique (email);
    `, { raw: true })

    await db.query(`
      ALTER TABLE users
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })
  }
}
