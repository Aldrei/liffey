import db from '@/database/instance'; // Replace with your actual path to the Sequelize instance
import { Clients, States } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the cities model
export interface ICity {
  id?: number;
  client_id?: number | null;
  state_id: number;
  name: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

// Define the Cities model with the interface and extend Model
interface CityModel extends Model<ICity>, ICity {}

export const Cities = db.define<CityModel>('City', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  client_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  state_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
}, {
  tableName: 'cities',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const CitiesSetup = {
  syncTable: async () => await Cities.sync({ force: true }),
  syncAssociations: async () => {
    // Application level.
    Cities.belongsTo(Clients, { foreignKey: 'client_id', onDelete: 'CASCADE' });
    Cities.belongsTo(States, { foreignKey: 'state_id', onDelete: 'CASCADE' });
  },
  syncRelationships: async () => {
    // Database level.
    await db.query(`
      ALTER TABLE cities
      ADD KEY cities_state_id_foreign (state_id),
      ADD KEY cities_client_id_foreign (client_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE cities
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE cities
      ADD CONSTRAINT cities_client_id_foreign FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE,
      ADD CONSTRAINT cities_state_id_foreign FOREIGN KEY (state_id) REFERENCES states (id);
    `, { raw: true })
  }
}