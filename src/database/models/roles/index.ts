// Import Sequelize and necessary types
import db from '@/database/instance';
import { DataTypes, Model } from 'sequelize';
import { Users } from '../users';

export enum ROLES {
  ADMINISTRATOR = 'admin',
  AGENT = 'agent',
  BROKER = 'broker',
  FINANCIAL = 'financial',
  MANAGER = 'manager'
}

// Define the interface for the roles model
export interface IRole {
  name: string;
  display_name: string;
  description: string;
  created_at: Date | null;
  updated_at: Date | null;
}

// Define the Roles model with the interface and extend Model
interface RolesModel extends Model<IRole>, IRole {}

// Define the roles table
export const Roles = db.define<RolesModel>('Roles', {
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  display_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
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
  tableName: 'roles',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const RolesSetup = {
  syncTable: async () => await Roles.sync({ force: true }),
  syncAssociations: async () => {
    // Application level.
    Roles.belongsToMany(Users, { through: 'role_user', foreignKey: 'role_name', timestamps: false })
  },
  syncRelationships: async () => {
    // Database level.
    await db.query(`
      ALTER TABLE roles
      ADD UNIQUE KEY roles_name_unique (name);
    `, { raw: true })
  }
}
