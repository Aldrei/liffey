import { Sequelize } from "sequelize";

/**
 * Create a Docker named network to link with Postgres.
*/
const db = new Sequelize('postgres://postgres:psql@172.17.0.2:5432/postgres')

try {
  const init = async () => await db.authenticate();
  init()
  
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default db;
