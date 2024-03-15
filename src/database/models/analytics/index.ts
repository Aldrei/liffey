import db from '@/database/instance';
import { Clients, Properties } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

export interface IAnalytics {
  id?: number;
  client_id: number;
  property_id?: number | null;
  prospect_index?: string | null;
  ip?: string | null;
  hostname?: string | null;
  pathname?: string | null;
  search?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

interface AnalyticsModel extends Model<IAnalytics>, IAnalytics {}

export const Analytics = db.define<AnalyticsModel>('Analytics', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // Primary keys are create in database level.
  },
  client_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  property_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: null,
  },
  prospect_index: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  ip: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  hostname: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  pathname: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  search: {
    type: DataTypes.STRING,
    defaultValue: null,
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
  tableName: 'analytics',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const AnalyticsSetup = {
  syncTable: async () => await Analytics.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    Analytics.belongsTo(Clients, { foreignKey: 'client_id', onDelete: 'CASCADE' });
    Analytics.belongsTo(Properties, { foreignKey: 'property_id', onDelete: 'CASCADE' });

    // Database level.
    await db.query(`
      ALTER TABLE analytics
      ADD KEY analytics_client_id_foreign (client_id),
      ADD KEY prospect_index (prospect_index),
      ADD KEY analytics_property_id_foreign (property_id);  
    `, { raw: true })

    await db.query(`
      ALTER TABLE analytics
      MODIFY id int(11) NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE analytics
      ADD CONSTRAINT analytics_client_id_foreign FOREIGN KEY (client_id) REFERENCES clients (id),
      ADD CONSTRAINT analytics_property_id_foreign FOREIGN KEY (property_id) REFERENCES properties (id);
    `, { raw: true })
  }
}
