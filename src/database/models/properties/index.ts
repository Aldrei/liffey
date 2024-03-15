// Import Sequelize and necessary types
import db from '@/database/instance';
import { Cities, Clients, Employees, Neighborhoods, Owners } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the properties model
export interface IProperty {
  id?: number;
  client_id: number;
  city_id: number | null;
  neighborhood_id: number | null;
  owner_id: number | null;
  agent_id: number | null;
  broker_id: number | null;
  code: number | null;
  code_type: number | null;
  code_pretty: string | null;
  property_name: string | null;
  registration: string | null;
  lot: string | null;
  block: string | null;
  development: boolean | null;
  sign: boolean | null;
  has_photo: boolean | null;
  exclusivity: boolean | null;
  exclusivity_start_period: Date | null;
  exclusivity_end_period: Date | null;
  purpose: string | null;
  category: string | null;
  type: string | null;
  status: string | null;
  rent_start_period: Date | null;
  rent_end_period: Date | null;
  bedrooms: string | null;
  garage: string | null;
  laundry: boolean | null;
  roof: string | null;
  ceiling: string | null;
  floor: string | null;
  openings: string | null;
  alarm: boolean | null;
  electronic_gate: boolean | null;
  artesian_well: boolean | null;
  electric_fence: boolean | null;
  video_camera: boolean | null;
  sunrise: string | null;
  general_description: string | null;
  agency_date: Date | null;
  sale_date: Date | null;
  condo_name: string | null;
  condo_building: string | null;
  condo_floor: string | null;
  condo_total_floors: string | null;
  condo_unit: string | null;
  condo_elevator: boolean | null;
  total_area: number | null;
  built_area: number | null;
  front_area: number | null;
  back_area: number | null;
  right_area: number | null;
  left_area: number | null;
  value: number | null;
  commission_condition_value: string | null;
  commission_percentage_value: number | null;
  broker_percentage_value: number | null;
  agency_percentage_value: number | null;
  condo_value: number | null;
  paid_iptu_value: string | null;
  iptu_value: number | null;
  paid_inss_value: string | null;
  inss_value: number | null;
  cub_index_value: number | null;
  regularization_something_value: string | null;
  regularization_something_description: string | null;
  agent_condition: string | null;
  installment_condition: string | null;
  outstanding_balance_condition: string | null;
  deadline_condition: string | null;
  readjustment_condition: string | null;
  fgts_condition: boolean | null;
  donation_condition: boolean | null;
  financing_condition: boolean | null;
  consortium_letter_condition: boolean | null;
  exchange_part_condition: boolean | null;
  situation_condition: string | null;
  condition_observation: string | null;
  state_location: string | null;
  city_location_id: string | null;
  neighborhood_location_id: string | null;
  location_street: string | null;
  location_number: string | null;
  location_zip_code: string | null;
  nearby_locations: string | null;
  latitude: string | null;
  longitude: string | null;
  zoom: boolean | null;
  publish_property_website: boolean | null;
  publish_value_website: boolean | null;
  property_highlight_website: boolean | null;
  website_access: string | null;
  publish_map_website: boolean | null;
  video_url: string | null;
  last_transaction_id: string | null;
  created_at?: Date;
  updated_at?: Date;
}

// Define the Property model with the interface and extend Model
interface PropertyModel extends Model<IProperty>, IProperty {}

// Define the properties table
export const Properties = db.define<PropertyModel>('Property', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  client_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  city_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  neighborhood_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  owner_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  agent_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  broker_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  code: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  code_type: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  code_pretty: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  property_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  registration: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lot: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  block: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  development: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  sign: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  has_photo: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  exclusivity: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  exclusivity_start_period: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  exclusivity_end_period: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  purpose: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rent_start_period: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  rent_end_period: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  bedrooms: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  garage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  laundry: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  roof: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ceiling: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  floor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  openings: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  alarm: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  electronic_gate: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  artesian_well: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  electric_fence: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  video_camera: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  sunrise: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  general_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  agency_date: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  sale_date: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  condo_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  condo_building: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  condo_floor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  condo_total_floors: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  condo_unit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  condo_elevator: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  total_area: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  built_area: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  front_area: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  back_area: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  right_area: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  left_area: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  value: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  commission_condition_value: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  commission_percentage_value: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  broker_percentage_value: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  agency_percentage_value: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  condo_value: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  paid_iptu_value: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  iptu_value: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  paid_inss_value: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  inss_value: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  cub_index_value: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  regularization_something_value: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  regularization_something_description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  agent_condition: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  installment_condition: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  outstanding_balance_condition: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deadline_condition: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  readjustment_condition: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fgts_condition: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  donation_condition: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  financing_condition: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  consortium_letter_condition: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  exchange_part_condition: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  situation_condition: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  condition_observation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  state_location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city_location_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  neighborhood_location_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location_street: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location_zip_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nearby_locations: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  zoom: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  publish_property_website: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  publish_value_website: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  property_highlight_website: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  website_access: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  publish_map_website: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  video_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_transaction_id: {
    type: DataTypes.STRING,
    allowNull: true,
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
  tableName: 'properties',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});


export const PropertiesSetup = {
  syncTable: async () => await Properties.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    Properties.belongsTo(Employees, { foreignKey: 'agent_id', onDelete: 'SET NULL' });
    Properties.belongsTo(Employees, { foreignKey: 'broker_id', onDelete: 'SET NULL' });
    Properties.belongsTo(Cities, { foreignKey: 'city_id', onDelete: 'SET NULL' });
    Properties.belongsTo(Clients, { foreignKey: 'client_id', onDelete: 'CASCADE' });
    Properties.belongsTo(Neighborhoods, { foreignKey: 'neighborhood_id', onDelete: 'SET NULL' });
    Properties.belongsTo(Owners, { foreignKey: 'owner_id', onDelete: 'SET NULL' });

    // Database level.
    await db.query(`
      ALTER TABLE properties
      ADD KEY properties_broker_id_foreign (broker_id),
      ADD KEY properties_agent_id_foreign (agent_id),
      ADD KEY properties_owner_id_foreign (owner_id),
      ADD KEY properties_neighborhood_id_foreign (neighborhood_id),
      ADD KEY properties_city_id_foreign (city_id),
      ADD KEY properties_client_id_foreign (client_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE properties
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE properties
      ADD CONSTRAINT properties_agent_id_foreign FOREIGN KEY (agent_id) REFERENCES employees (id),
      ADD CONSTRAINT properties_broker_id_foreign FOREIGN KEY (broker_id) REFERENCES employees (id),
      ADD CONSTRAINT properties_city_id_foreign FOREIGN KEY (city_id) REFERENCES cities (id),
      ADD CONSTRAINT properties_client_id_foreign FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE,
      ADD CONSTRAINT properties_neighborhood_id_foreign FOREIGN KEY (neighborhood_id) REFERENCES neighborhoods (id),
      ADD CONSTRAINT properties_owner_id_foreign FOREIGN KEY (owner_id) REFERENCES owners (id);
    `, { raw: true })
  }
}
