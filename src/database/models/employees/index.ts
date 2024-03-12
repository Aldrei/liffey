// Import Sequelize and necessary types
import db from '@/database/instance';
import { Cities, Clients, Neighborhoods, Users } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the employees model
export interface IEmployees {
  id?: number;
  user_id?: number | null;
  client_id?: number | null;
  city_id?: number | null;
  neighborhood_id?: number | null;
  nome?: string | null;
  dataNascimento?: string | null;
  cargo?: string | null;
  salarioBase?: string | null;
  creci?: string | null;
  usuarioDoSistema?: string | null;
  ativo?: string | null;
  estado?: string | null;
  idCidade?: string | null;
  idBairro?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  cep?: string | null;
  apto?: string | null;
  email?: string | null;
  email2?: string | null;
  celular?: string | null;
  fixo?: string | null;
  foto?: string | null;
  fotoMini?: string | null;
  publicarNoSite?: string | null;
  oculto?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

// Define the Employees model with the interface and extend Model
interface EmployeesModel extends Model<IEmployees>, IEmployees {}

// Define the employees table
export const Employees = db.define<EmployeesModel>('Employees', {
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
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dataNascimento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  salarioBase: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  creci: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  usuarioDoSistema: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ativo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idCidade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idBairro: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  logradouro: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  apto: {
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
  celular: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fixo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fotoMini: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  publicarNoSite: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  oculto: {
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
  timestamps: true,
  collate: 'utf8_unicode_ci', // Add collate at the table level
});

export const EmployeesSetup = {
  syncTable: async () => await Employees.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    Employees.belongsTo(Cities, { foreignKey: 'city_id' });
    Employees.belongsTo(Clients, { foreignKey: 'client_id', onDelete: 'CASCADE' });
    Employees.belongsTo(Neighborhoods, { foreignKey: 'neighborhood_id' });
    Employees.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'SET NULL' });

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
