import { DataTypes, Model } from 'sequelize';

import db from '@/database/instance';

// Define an interface extending ModelAttributes
interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
  // Add other properties as needed
}

// Define the User model with the interface and extend Model
interface UserModel extends Model<IUser>, IUser {}

export const User = db.define<UserModel>('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  tableName: 'Users',
  // don't forget to enable timestamps!
  timestamps: true,
  // I don't want createdAt
  createdAt: false,
  // I want updatedAt to actually be called updateTimestamp
  updatedAt: 'updateTimestamp'
});

// `sequelize.define` also returns the model
console.log(`Table Users creation status: ${User === db.models['User']}`); // true

export const createDb = async () => {
  await db.sync({ force: true })
}