import { JWTData } from "@/helpers/token/types"
import { Request } from "express"
import jwt from 'jsonwebtoken'

export const extractUserFromToken = (req: Request): JWTData => {
  try {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    
    return jwt.decode(token) as JWTData
  } catch (error) {
    console.log(error);
  }
}