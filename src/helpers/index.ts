import ENV from "@/config";
import { NodeEnv } from "@/config/types";

export const isDev = (): boolean => ENV.NODE_ENV === NodeEnv.DEV 

export const getLocalhost = (): string => `${ENV.APP_PROTOCOL}${ENV.APP_HOST}:${ENV.APP_PORT}`
  
export const isGqlReferer = (referer: string): boolean => referer && referer?.indexOf('/graphql') !== -1
