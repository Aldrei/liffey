import ENV from "@/config"
import { NodeEnv } from "@/config/types"

export const isDev = (): boolean => ENV.NODE_ENV === NodeEnv.DEV 

export const getLocalhost = (): string => `${ENV.APP_PROTOCOL}${ENV.APP_HOST}:${ENV.APP_PORT}`
  
export const isGqlReferer = (referer: string): boolean => referer && referer?.indexOf('/graphql') !== -1

export const dateBrToDb = (dateString: string): Date => {
  if (!dateString) return undefined

  const [day, month, year] = dateString.split('/').map(Number)

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
      throw new Error('Invalid date format')
  }

  return new Date(year, month - 1, day)
}

export const decimalBrToDb = (decimalString: string): number => {
  if (!decimalString) return undefined

  const englishFormat = decimalString.replace(/\./g, '').replace(',', '.')

  const floatValue = parseFloat(englishFormat)

  return Math.trunc(floatValue)
}

export const switchToInteger = (value: any): number => (value === 'on' || value === Number(value)) ? 1 : 0

export const removeSpecialChar = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '')

export const makeCodePretty = (type: string, codeType: number): string => {
  try {
    let complement: string;

    switch (codeType?.toString()?.length) {
      case 1: complement = '00'; break;
      case 2: complement = '0'; break;
      default: complement = '';
    }

    const strArr: string[] = type.split(' ');

    const abbr: string = `${strArr[0] ? removeSpecialChar(strArr[0]).substring(0, 2).toUpperCase() : ''}${strArr[1] ? removeSpecialChar(strArr[1]).substring(0, 1).toUpperCase() : ''}`

    return `${abbr}${complement}${codeType.toString()}`
  } catch (error) {
    console.error(`makeCodePretty ${error}`);
    return ''
  }
};

export const removeHTML = (htmlString: string): string => {
  try {
    const htmlRegex = /<[^>]*>/g;
    return htmlString.replace(htmlRegex, '');
  } catch (error) {
    console.error(`removeHTML ${error}`);
    return null
  }
}

export const isValidDate = (date: Date): Date => {
  try {
    if (!date) return null

    const dateString = date.toDateString().slice(0, 10)
    
    if(!dateString || (dateString === '1970-01-01' || dateString === '0000-00-00')) return null

    return date
  } catch (error) {
    console.error(`isValidDate: ${error}`);
    return null
  }
}

export const hasValueDecimal = (value: number): number => value && value !== 0.00 ? value : null

export const getCdnUrl = () => `${ENV.CDN_PROTOCOL}${ENV.CDN_HOST}:${ENV.CDN_PORT}`

export const getImageUrl = (src: string) => `${getCdnUrl()}/images/${src}`

export const getVideoUrl = (src: string) => `${getCdnUrl()}/videos/${src}`