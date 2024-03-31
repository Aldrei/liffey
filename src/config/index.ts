import { NodeEnv } from "@/config/types";
import dotenv from "dotenv";
import { DraftHeadersVersion } from "express-rate-limit";

export interface IProcessEnv {
  NODE_ENV: NodeEnv
  APP_PROTOCOL: 'http://' | 'https://'
  APP_HOST: string
  APP_PORT: number
  CDN_PROTOCOL: 'http://' | 'https://'
  CDN_HOST: string
  CDN_PORT: number
  DB_SERVICE: string
  DB_USER: string
  DB_PASS: string
  DB_HOST: string
  DB_PORT: string
  DB_NAME: string
  CORS_DOMAINS: string
  JWT_SECRET: string
  GQL_ENDPOINT: string
  RATE_LIMIT_WINDOW_TIME: number
  RATE_LIMIT_REQUESTS: number
  RATE_LIMIT_HEADER: boolean | DraftHeadersVersion
  RATE_LIMIT_LEGACY_HEADER: boolean
  RATE_LIMIT_STATUS_CODE: number
  RATE_LIMIT_PROP_NAME: string
}

dotenv.config()
const ENV = process.env as unknown as IProcessEnv

export default ENV
