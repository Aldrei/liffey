import ENV from "@/config";
import { IClient } from "@/database/models";

export const UPLOAD_IMAGE_STORAGE_PATH = 'public/images'
export const UPLOAD_VIDEO_STORAGE_PATH = 'public/videos'

export enum GetCdnUrlType {
  THUMB_IMAGE = '/public/images/thumb-',
  NORMAL_IMAGE = '/public/images/',
}

export const THUMB_STORAGE_PATH = `${process.cwd()}/${GetCdnUrlType.THUMB_IMAGE}`
export const NORMAL_STORAGE_PATH = `${process.cwd()}/${GetCdnUrlType.NORMAL_IMAGE}`

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
