import { JWTData } from "@/helpers/token/types"
import { Request } from "express"
import jwt from 'jsonwebtoken'

export const extractUserFromToken = (req: Request): JWTData => {
  try {
    const { authorization } = req.headers
    const token = authorization?.split?.(' ')?.[1]
    
    if (!token) throw Error('Forbidden. Token is required.')

    const decodedToken = jwt.decode(token) as JWTData

    if (!decodedToken) throw Error('Forbidden. Undecoded token.')

    return decodedToken
  } catch (error) {
    console.log(error);
    return { error: error.message }
  }
}
