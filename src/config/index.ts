import dotenv from "dotenv";

export interface ProcessEnv {
  DB_SERVICE: string
  DB_USER: string
  DB_PASS: string
  DB_HOST: string
  DB_PORT: string
  DB_NAME: string
}

dotenv.config()
const ENV = process.env as unknown as ProcessEnv

export default ENV
