import ENV from "@/config";
import { IClient } from "@/database/models";

export enum GetCdnUrlType {
  THUMB_IMAGE = '/photos/thumb/',
  NORMAL_IMAGE = '/photos/normal/',
}

export const getCdnUrl = (file: string, type: GetCdnUrlType): string => {
  if (!file) return ''

  switch (type) {
    case GetCdnUrlType.THUMB_IMAGE: return `${ENV.CDN_PROTOCOL}${ENV.CDN_HOST}${ENV.CDN_PORT}${GetCdnUrlType.THUMB_IMAGE}`
    case GetCdnUrlType.NORMAL_IMAGE: return `${ENV.CDN_PROTOCOL}${ENV.CDN_HOST}${ENV.CDN_PORT}${GetCdnUrlType.NORMAL_IMAGE}`
    default: return ''
  }
}

export const getApiUrl = () => `${ENV.APP_PROTOCOL}${ENV.APP_HOST}`

export const getBaseUrl = (domain: Pick<IClient, 'domain'>) => {
  try {
    if (!domain) throw Error('Forbidden. Domain unauthorized to request public routes.')
    return `${ENV.APP_PROTOCOL}${ENV.APP_HOST}/api/pub/${domain}`
  } catch (error) {
    console.log(error);
    return error
  }
}
