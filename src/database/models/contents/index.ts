// Import Sequelize and necessary types
import db from '@/database/instance';
import { Clients } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the contents model
export interface IContent {
  id?: number;
  client_id: number;
  page: string;
  element_id: string;
  content: string;
  created_at?: Date;
  updated_at?: Date;
}

// Define the Content model with the interface and extend Model
interface ContentModel extends Model<IContent>, IContent {}

// Define the contents table
export const Contents = db.define<ContentModel>('Content', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  client_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  page: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  element_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
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
  tableName: 'contents',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const ContentsSetup = {
  syncTable: async () => await Contents.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    Contents.belongsTo(Clients, { foreignKey: 'client_id', onDelete: 'CASCADE' });

    // Database level.
    await db.query(`
      ALTER TABLE contents
      ADD KEY contents_client_id_foreign (client_id),
      ADD KEY contents_page_index (page),
      ADD KEY contents_element_id_index (element_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE contents
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE contents
      ADD CONSTRAINT contents_client_id_foreign FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE;
    `, { raw: true })
  }
}
