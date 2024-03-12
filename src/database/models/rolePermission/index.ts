// Import Sequelize and necessary types
import db from '@/database/instance';
import { Permissions, Roles } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the role_permission model
export interface IRolePermission {
  role_name: string;
  permission_name: string;
}

// Define the RolePermission model with the interface and extend Model
interface RolePermissionModel extends Model<IRolePermission>, IRolePermission {}

// Define the role_permission table
export const RolePermission = db.define<RolePermissionModel>('RolePermission', {
  role_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  permission_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: 'role_permission',
  timestamps: false,
  collate: 'utf8_unicode_ci', // Add collate at the table level
});

export const RolePermissionSetup = {
  syncTable: async () => await RolePermission.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    RolePermission.belongsTo(Roles, { foreignKey: 'role_name', onDelete: 'CASCADE' })
    RolePermission.belongsTo(Permissions, { foreignKey: 'permission_name', onDelete: 'CASCADE' })

    // Database level.
    await db.query(`
      ALTER TABLE role_permission
      ADD KEY role_permission_role_name_foreign (role_name),
      ADD KEY role_permission_permission_name_foreign (permission_name);
    `, { raw: true })

    await db.query(`
      ALTER TABLE role_permission
      ADD CONSTRAINT role_permission_permission_name_foreign FOREIGN KEY (permission_name) REFERENCES permissions (name) ON DELETE CASCADE,
      ADD CONSTRAINT role_permission_role_name_foreign FOREIGN KEY (role_name) REFERENCES roles (name) ON DELETE CASCADE;
    `, { raw: true })
  }
}
