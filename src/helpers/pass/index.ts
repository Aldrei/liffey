import bcrypt from 'bcryptjs'

export const encryptPass = (plainPass: string): string => bcrypt.hashSync(plainPass, bcrypt.genSaltSync(8))

export const comparePass = (plainPass: string, hashedPass: string): boolean => bcrypt.compareSync(plainPass, hashedPass)
