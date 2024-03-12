// Import Sequelize and necessary types
import db from '@/database/instance';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the permissions model
export interface IPermission {
  name: string;
  display_name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

// Define the Permission model with the interface and extend Model
interface PermissionModel extends Model<IPermission>, IPermission {}

// Define the permissions table
export const Permissions = db.define<PermissionModel>('Permission', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  display_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
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
  },
}, {
  tableName: 'permissions',
  timestamps: false, // No timestamps for this table
  collate: 'utf8_unicode_ci', // Add collate at the table level
});

export const PermissionsSetup = {
  syncTable: async () => await Permissions.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    // ...

    // Database level.
    await db.query(`
      ALTER TABLE permissions
      ADD UNIQUE KEY permissions_name_unique (name);
    `, { raw: true })
  }
}
