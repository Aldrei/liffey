import ENV from "@/config";
import { NodeEnv } from "@/config/types";

export const isDev = (): boolean => ENV.NODE_ENV === NodeEnv.DEV 
