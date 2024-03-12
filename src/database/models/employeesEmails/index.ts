// Import Sequelize and necessary types
import db from '@/database/instance';
import { Emails, Employees } from '@/database/models';
import { DataTypes, Model } from 'sequelize';

// Define the interface for the employee_emails model
export interface IEmployeesEmails {
  employee_id: number;
  email_id: number;
  created_at?: Date;
  updated_at?: Date;
}

// Define the EmployeesEmails model with the interface and extend Model
interface EmployeesEmailsModel extends Model<IEmployeesEmails>, IEmployeesEmails {}

// Define the employee_emails table
export const EmployeesEmails = db.define<EmployeesEmailsModel>('EmployeesEmails', {
  employee_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  email_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
    onUpdate: 'CURRENT_TIMESTAMP',
  },
}, {
  tableName: 'employees_emails',
  timestamps: true,
  collate: 'utf8_unicode_ci', // Add collate at the table level
});

export const EmployeesEmailsSetup = {
  syncTable: async () => await EmployeesEmails.sync({ force: true }),
  syncRelationships: async () => {
    // Application level.
    EmployeesEmails.belongsTo(Employees, { foreignKey: 'employee_id', onDelete: 'CASCADE' });
    EmployeesEmails.belongsTo(Emails, { foreignKey: 'email_id', onDelete: 'CASCADE' });

    // Database level.
    await db.query(`
      ALTER TABLE employees_emails
      ADD KEY employees_emails_employee_id_foreign (employee_id),
      ADD KEY employees_emails_email_id_foreign (email_id);
    `, { raw: true })

    await db.query(`
      ALTER TABLE employees_emails
      ADD CONSTRAINT employees_emails_email_id_foreign FOREIGN KEY (email_id) REFERENCES emails (id),
      ADD CONSTRAINT employees_emails_employee_id_foreign FOREIGN KEY (employee_id) REFERENCES employees (id);
    `, { raw: true })
  }
}
