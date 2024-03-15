// Import Sequelize and necessary types
import db from '@/database/instance';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the password_resets model
export interface IPasswordsResets {
  email: string;
  token: string;
  created_at: Date;
}

// Define the PasswordsResets model with the interface and extend Model
interface PasswordsResetsModel extends Model<IPasswordsResets>, IPasswordsResets {}

// Define the password_resets table
export const PasswordsResets = db.define<PasswordsResetsModel>('PasswordsResets', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    onUpdate: 'CURRENT_TIMESTAMP',
  },
}, {
  tableName: 'passwords_resets',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const PasswordsResetsSetup = {
  syncTable: async () => await PasswordsResets.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    // ...

    // Database level.
    await db.query(`
      ALTER TABLE passwords_resets
      ADD KEY passwords_resets_email_index (email),
      ADD KEY passwords_resets_token_index (token); 
    `, { raw: true })
  }
}
