import { NodeEnv } from "@/config/types";
import dotenv from "dotenv";

export interface IProcessEnv {
  NODE_ENV: NodeEnv
  APP_PROTOCOL: 'http://' | 'https://'
  APP_HOST: string
  APP_PORT: number
  DB_SERVICE: string
  DB_USER: string
  DB_PASS: string
  DB_HOST: string
  DB_PORT: string
  DB_NAME: string
  CORS_DOMAINS: string
}

dotenv.config()
const ENV = process.env as unknown as IProcessEnv

export default ENV
