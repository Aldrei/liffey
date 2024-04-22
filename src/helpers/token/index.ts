import { JWTData } from "@/helpers/token/types"
import { Request } from "express"
import jwt from 'jsonwebtoken'

export const extractUserFromToken = (req: Request): JWTData => {
  try {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    
    const decodedToken = jwt.decode(token) as JWTData

    if (!decodedToken) throw Error('Undecoded token.')

    return decodedToken
  } catch (error) {
    console.log(error);
    return { error: error.message }
  }
}
