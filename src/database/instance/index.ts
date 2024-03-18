import ENV from "@/config";
import { Sequelize } from "sequelize";

/**
 * Create a Docker named network to link with Postgres.
*/
const db = new Sequelize(`
  ${ENV.DB_SERVICE}://${ENV.DB_USER}@${ENV.DB_HOST}:${ENV.DB_PORT}`
)

try {
  (async () => await db.authenticate())();
  
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default db;
