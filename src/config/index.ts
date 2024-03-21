import { NodeEnv } from "@/config/types";
import dotenv from "dotenv";

export interface IProcessEnv {
  NODE_ENV: NodeEnv
  APP_PORT: number
  DB_SERVICE: string
  DB_USER: string
  DB_PASS: string
  DB_HOST: string
  DB_PORT: string
  DB_NAME: string
}

dotenv.config()
const ENV = process.env as unknown as IProcessEnv

export default ENV
