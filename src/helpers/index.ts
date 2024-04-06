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
    console.log(error);
  }
};
