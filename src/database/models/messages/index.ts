// Import Sequelize and necessary types
import db from '@/database/instance';
import { Clients } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the messages model
export interface IMessage {
  id?: number;
  client_id: number;
  email?: string | null;
  primary_contact?: string | null;
  secondary_contact?: string | null;
  name?: string | null;
  subject?: string | null;
  message: string;
  created_at?: Date;
  updated_at?: Date;
}

// Define the Message model with the interface and extend Model
interface MessageModel extends Model<IMessage>, IMessage {}

// Define the messages table
export const Messages = db.define<MessageModel>('Message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  client_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  primary_contact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  secondary_contact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
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
  },
}, {
  tableName: 'messages',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const MessagesSetup = {
  syncTable: async () => await Messages.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    Messages.belongsTo(Clients, { foreignKey: 'client_id' });

    // Database level.
    await db.query(`
      ALTER TABLE messages
      ADD KEY client_id (client_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE messages
      MODIFY id int(11) NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE messages
      ADD CONSTRAINT messages_ibfk_1 FOREIGN KEY (client_id) REFERENCES clients (id);
    `, { raw: true })
  }
}
