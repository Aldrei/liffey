export const parseArrayModel = <T>(sourceArr: any[], parseFn: <T>(source: any) => T) => sourceArr.map<T>(parseFn) as T[]
