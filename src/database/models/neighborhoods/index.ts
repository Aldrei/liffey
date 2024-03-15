// Import Sequelize and necessary types
import db from '@/database/instance';
import { Cities, Clients } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the neighborhoods model
export interface INeighborhood {
  id?: number;
  client_id: number | null;
  city_id: number | null;
  idBairro: string;
  nome: string;
  idCidade: string;
  created_at?: Date;
  updated_at?: Date;
}

// Define the Neighborhood model with the interface and extend Model
interface NeighborhoodModel extends Model<INeighborhood>, INeighborhood {}

// Define the neighborhoods table
export const Neighborhoods = db.define<NeighborhoodModel>('Neighborhood', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  client_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  city_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  idBairro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idCidade: {
    type: DataTypes.STRING,
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
  tableName: 'neighborhoods',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const NeighborhoodsSetup = {
  syncTable: async () => await Neighborhoods.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    Neighborhoods.belongsTo(Cities, { foreignKey: 'city_id', onDelete: 'CASCADE' });
    Neighborhoods.belongsTo(Clients, { foreignKey: 'client_id', onDelete: 'CASCADE' });

    // Database level.
    await db.query(`
      ALTER TABLE neighborhoods
      ADD KEY neighborhoods_city_id_foreign (city_id),
      ADD KEY neighborhoods_client_id_foreign (client_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE neighborhoods
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE neighborhoods
      ADD CONSTRAINT neighborhoods_city_id_foreign FOREIGN KEY (city_id) REFERENCES cities (id) ON DELETE CASCADE,
      ADD CONSTRAINT neighborhoods_client_id_foreign FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE;
    `, { raw: true })
  }
}
