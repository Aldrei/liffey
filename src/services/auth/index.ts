import ENV from '@/config';
import { AuthTokens } from '@/database/models';
import { extractUserFromToken } from '@/helpers/token';
import { IAnalyzeTokenService } from '@/services/auth/types';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

export type CustomResolver = (
  _: any, 
  attrs: any, 
  ctx: any,
  info: any
) => Promise<ResolverAuthentication>

export type ResolverAuthentication = (ctx: any, resolver: () => any) => Promise<any>

export const publicRouteResolver: ResolverAuthentication = async (ctx: any, resolver: () => any) => {
  try {
    const tokenResult = await validPublicRouteTokenService(ctx.token)
    if (tokenResult?.error) throw new Error(`Public Resolver: ${tokenResult.error}`);

    return resolver()
  } catch (error) {
    console.log(error);
    return error
  }
}

/**
 * Public routes use token 1:1(one token for one request) generated a common secret key between server and client.
*/
export const validPublicRouteTokenService = async (token: string): Promise<IAnalyzeTokenService> => {
  try {
    jwt.verify(token, ENV.JWT_SECRET)

    const tokenStored = await AuthTokens.findOne({ where: { token }, attributes: ['id'] })
    if (tokenStored?.id) throw Error('Forbidden. Expired token.')

    await AuthTokens.create({ token })
    
    return { message: 'Authorized token.' }
  } catch (error) {
    console.log(error);
    return { error: error?.message }
  }
}

export const validGuardRouteTokenService = async (req: Request): Promise<IAnalyzeTokenService> => {
  try {
    const { error } = extractUserFromToken(req)
    if (error) throw Error(error)
    
    return { message: 'Authorized token.' }
  } catch (error) {
    console.log(error);
    return { error: error?.message }
  }
}
