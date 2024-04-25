// Import Sequelize and necessary types
import db from '@/database/instance';
import { Cities, Clients, ICity, INeighborhood, Neighborhoods, Users } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the employees model
export interface IEmployees {
  id?: number;
  user_id?: number | null;
  client_id?: number | null;
  city_id?: number | null;
  neighborhood_id?: number | null;
  name?: string | null;
  birth_date?: string | null;
  position?: string | null;
  base_salary?: string | null;
  creci?: string | null;
  system_user?: string | null;
  active?: string | null;
  state?: string | null;
  idCidade?: string | null; // Preserved
  idBairro?: string | null; // Preserved
  street?: string | null;
  number?: string | null;
  zip_code?: string | null;
  apartment?: string | null;
  email?: string | null;
  email2?: string | null;
  cellphone?: string | null;
  phone?: string | null;
  photo?: string | null;
  thumbnail?: string | null;
  publish_on_website?: string | null;
  hidden?: string | null;
  City?: ICity
  Neighborhood?: INeighborhood
  created_at?: Date;
  updated_at?: Date;
}

// Define the Employees model with the interface and extend Model
interface EmployeeModel extends Model<IEmployees>, IEmployees {}

// Define the employees table
export const Employees = db.define<EmployeeModel>('Employees', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birth_date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  base_salary: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  creci: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  system_user: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  active: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idCidade: {
    type: DataTypes.STRING, // Preserved
    allowNull: true,
  },
  idBairro: {
    type: DataTypes.STRING, // Preserved
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
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cellphone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
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
  publish_on_website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hidden: {
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
  tableName: 'employees',
  collate: 'utf8_unicode_ci',
  timestamps: false,
});



export const EmployeesSetup = {
  syncTable: async () => await Employees.sync({ force: true }),
  syncAssociations: async () => {
    // Application level.
    Employees.belongsTo(Clients, { foreignKey: 'client_id', onDelete: 'CASCADE' });
    Employees.belongsTo(Cities, { foreignKey: 'city_id' });
    Employees.belongsTo(Neighborhoods, { foreignKey: 'neighborhood_id' });
    Employees.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'SET NULL' });
  },
  syncRelationships: async () => {
    // Database level.
    await db.query(`
      ALTER TABLE employees
      ADD KEY employees_neighborhood_id_foreign (neighborhood_id),
      ADD KEY employees_city_id_foreign (city_id),
      ADD KEY employees_client_id_foreign (client_id),
      ADD KEY employees_user_id_foreign (user_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE employees
      MODIFY id int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
    `, { raw: true })

    await db.query(`
      ALTER TABLE employees
      ADD CONSTRAINT employees_city_id_foreign FOREIGN KEY (city_id) REFERENCES cities (id),
      ADD CONSTRAINT employees_client_id_foreign FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE,
      ADD CONSTRAINT employees_neighborhood_id_foreign FOREIGN KEY (neighborhood_id) REFERENCES neighborhoods (id),
      ADD CONSTRAINT employees_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL;
    `, { raw: true })
  }
}
