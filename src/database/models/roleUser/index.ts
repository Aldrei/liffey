// Import Sequelize and necessary types
import db from '@/database/instance';
import { Roles, Users } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the role_user model
export interface IRoleUser {
  role_name: string;
  user_id: number;
}

// Define the RoleUser model with the interface and extend Model
interface RoleUserModel extends Model<IRoleUser>, IRoleUser {}

// Define the role_user table
export const RoleUser = db.define<RoleUserModel>('RoleUser', {
  role_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
    // references: {
    //   model: 'roles',
    //   key: 'name',
    // },
    onDelete: 'CASCADE',
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    // references: {
    //   model: 'users',
    //   key: 'id',
    // },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'role_user',
  timestamps: false,
  collate: 'utf8_unicode_ci', // Add collate at the table level
});

export const RoleUserSetup = {
  syncTable: async () => await RoleUser.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    RoleUser.belongsTo(Roles, { foreignKey: 'role_name', onDelete: 'CASCADE' });
    RoleUser.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' });

    // Database level.
    await db.query(`
      ALTER TABLE role_user
      ADD KEY role_user_role_name_foreign (role_name),
      ADD KEY role_user_user_id_foreign (user_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE role_user
      ADD CONSTRAINT role_user_role_name_foreign FOREIGN KEY (role_name) REFERENCES roles (name) ON DELETE CASCADE,
      ADD CONSTRAINT role_user_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
    `, { raw: true })
  }
}
