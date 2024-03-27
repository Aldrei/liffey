import ENV from '@/config';
import { AuthTokens } from '@/database/models';
import { isDev } from '@/helpers';
import { IAnalyzeTokenService } from '@/services/auth/types';
import jwt from 'jsonwebtoken';

export type CustomResolver = (
  _: any, 
  attrs: any, 
  ctx: any,
  info: any
) => Promise<ResolverAuthentication>

export type ResolverAuthentication = (ctx: any, resolver: () => any) => Promise<any>

export const resolverAuthentication: ResolverAuthentication = async (ctx: any, resolver: () => any) => {
  try {
    // Bye
    if (!isDev()) {
      const tokenResult = await analyzeTokenService(ctx.token)
      if (tokenResult?.error) throw new Error(tokenResult.error);
    }

    return resolver()
  } catch (error) {
    console.log(error);
    return error
  }
}

export const analyzeTokenService = async (token: string): Promise<IAnalyzeTokenService> => {
  try {
    jwt.verify(token, ENV.JWT_SECRET)

    const tokenStored = await AuthTokens.findOne({ where: { token }, attributes: ['id'] })
    if (tokenStored?.id) throw Error('Unauthorized. Expired token.')

    await AuthTokens.create({ token })
    
    return { message: 'Authorized token.' }
  } catch (error) {
    console.log(error);
    return { error: error?.message }
  }
}
