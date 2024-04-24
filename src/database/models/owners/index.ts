// Import Sequelize and necessary types
import db from '@/database/instance';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the owners model
export interface IOwner {
  id?: number;
  client_id: number | null;
  city_id: number | null;
  neighborhood_id: number | null;
  owner_id: string;
  name_or_company: string;
  cpf_or_cnpj: string;
  rg: string;
  driver_license: string;
  person_type: string;
  state_registration: string;
  gender: string;
  marital_status: string;
  birth_date: Date | null;
  place_of_birth: string;
  profession: string;
  income: number | null;
  state: string;
  idCidade: string; // Deprecated
  idBairro: string; // Deprecated
  street: string;
  number: string;
  zip_code: string;
  apartment: string;
  phone: string;
  cellphone: string;
  fax: string;
  email: string;
  email2: string;
  notes: string;
  spouse_name: string;
  spouse_cpf: string;
  spouse_rg: string;
  spouse_driver_license: string;
  spouse_birth_date: string | null;
  spouse_place_of_birth: string;
  spouse_profession: string;
  spouse_income: string;
  spouse_father: string;
  spouse_mother: string;
  same_address_as_owner: string;
  spouse_state: string;
  spouse_idCidade: string; // Deprecated
  spouse_idBairro: string; // Deprecated
  spouse_street: string;
  spouse_number: string;
  spouse_zip_code: string;
  spouse_apartment: string;
  spouse_phone: string;
  spouse_cellphone: string;
  spouse_fax: string;
  spouse_email: string;
  spouse_email2: string;
  spouse_credit_analysis: string;
  spouse_credit_analysis_entry: string | null;
  spouse_credit_analysis_exit: string | null;
  spouse_credit_analysis_value: string;
  spouse_notes: string;
  photo: string;
  thumbnail: string;
  created_at?: Date;
  updated_at?: Date;
}

// Define the Owner model with the interface and extend Model
export interface OwnerModel extends Model<IOwner>, IOwner {}

// Define the owners table
export const Owners = db.define<OwnerModel>('Owner', {
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
  neighborhood_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  owner_id: { // Deprecated
    type: DataTypes.STRING,
    allowNull: true,
  },
  name_or_company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf_or_cnpj: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rg: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  driver_license: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  person_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state_registration: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  marital_status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birth_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: null,
  },
  place_of_birth: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profession: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  income: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idCidade: {  // Deprecated
    type: DataTypes.STRING,
    allowNull: true,
  },
  idBairro: {  // Deprecated
    type: DataTypes.STRING,
    allowNull: true,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  zip_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  apartment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cellphone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fax: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_cpf: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_rg: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_driver_license: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_birth_date: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  spouse_place_of_birth: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_profession: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_income: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_father: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_mother: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  same_address_as_owner: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_idCidade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_idBairro: { // Deprecated
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_street: { // Deprecated
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_zip_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_apartment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_cellphone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_fax: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_email2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_credit_analysis: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_credit_analysis_entry: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  spouse_credit_analysis_exit: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
  spouse_credit_analysis_value: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spouse_notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
    onUpdate: 'CURRENT_TIMESTAMP',
  },
}, {
  tableName: 'owners',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});

export const OwnersSetup = {
  syncTable: async () => await Owners.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    Owners.belongsTo(db.models.City, { foreignKey: 'city_id' });
    Owners.belongsTo(db.models.Client, { foreignKey: 'client_id', onDelete: 'CASCADE' });
    Owners.belongsTo(db.models.Neighborhood, { foreignKey: 'neighborhood_id' });

    // Database level.
    await db.query(`
      ALTER TABLE owners
      ADD KEY owners_neighborhood_id_foreign (neighborhood_id),
      ADD KEY owners_city_id_foreign (city_id),
      ADD KEY owners_client_id_foreign (client_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE owners
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE owners
      ADD CONSTRAINT owners_city_id_foreign FOREIGN KEY (city_id) REFERENCES cities (id),
      ADD CONSTRAINT owners_client_id_foreign FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE,
      ADD CONSTRAINT owners_neighborhood_id_foreign FOREIGN KEY (neighborhood_id) REFERENCES neighborhoods (id);
    `, { raw: true })
  }
}
