import bcrypt from 'bcryptjs';

export const encryptPass = (plainPass: string): string => bcrypt.hashSync(plainPass, bcrypt.genSaltSync(8))

export const comparePass = (plainPass: string, hashedPass: string): boolean => bcrypt.compareSync(plainPass, hashedPass)

const usernameDictionary = [
  'suces',
  'rique',
  'carre',
  'lider',
  'rique',
  'objet',
  'forca',
  'pross',
  'futur',
  'lider',
  'vonta',
  'espir',
  'viisa',
  'meeta',
  'felic',
  'cresc',
  'apren',
  'escol',
  'poode',
  'liide'
];

export const generateUsername = () => {
  const firstPart = usernameDictionary[Math.floor(Math.random() * usernameDictionary.length)]
  const secondPart = Math.floor(1000 + Math.random() * 9000)

  return `${firstPart}${secondPart}`
}