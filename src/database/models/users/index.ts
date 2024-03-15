// Import Sequelize and necessary types
import db from '@/database/instance';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the users model
export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  password_temp: string;
  remember_token: string | null;
  token_push: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

// Define the Users model with the interface and extend Model
interface UsersModel extends Model<IUser>, IUser {}

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
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password_temp: {
    type: DataTypes.STRING(255),
    defaultValue: '',
  },
  remember_token: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  token_push: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'users',
  paranoid: true,
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const UsersSetup = {
  syncTable: async () => await Users.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    // ...

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

// No foreign key associations specified in the provided SQL
