import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import morgan from 'morgan';

import fs from 'fs';
import path from 'path';

/** GraphQL */
import { resolvers } from '@/schemas/resolvers';
import { typeDefs } from '@/schemas/typeDefs';

/** Routes */
import { propertyPhotosRoutes, propertyRoutes, userRoutes, videosRoutes } from '@/routes/api/rest/guard';
import { tokenRoutes } from '@/routes/api/rest/public';

/** Check Environment */
import ENV from '@/config';
import { syncAssociations } from '@/database/sync/associations';
import { getLocalhost, isDev, isGqlReferer } from '@/helpers';
import { validGuardRouteTokenService } from '@/services/auth';
import rateLimit from 'express-rate-limit';

(globalThis as any).__DEV__ = isDev();

const app = express();

/**
 * Write logs.
*/
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/dev.log'), { flags: 'a' })

accessLogStream.on('error', (err) => {
  console.error('### LOG STREAM ERROR: Error writing to dev.log:', err);
})

app.use(morgan('common', { stream: accessLogStream }))

/**
 * Setup CORS.
*/
app.use(cors())

/**
 * Authentication for GraphQL API.
*/
app.use((req: Request, res: Response, next: NextFunction) => {
  // Bye
  // if (isDev()) return next()

  const { origin, referer } = req.headers

  const DOMAINS = ENV.CORS_DOMAINS.split(',') as string[]
  if (isDev()) DOMAINS.push(getLocalhost())

  if (isGqlReferer(referer) && !DOMAINS.includes(origin)) {
    return res.status(401).json({ error: 'Forbidden. Origin unauthorized for this GraphQL referer.' })
  }

  res.header('Access-Control-Allow-Origin', origin)
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  return next()
})

/**
 * Authentication for REST API.
*/
app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Bye
    // if (isDev()) return next()

    const { originalUrl } = req
    const { authorization } = req.headers

    if (originalUrl === ENV.GQL_ENDPOINT)
      return next()

    if (originalUrl === '/oauth/access_token') return next()

    const result = await validGuardRouteTokenService(authorization)
    if (result?.error) throw Error(result.error)

    return next()
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: `Forbidden. ${error.message}` })
  }
})

/**
 * Prevent rate limit.
*/
const limiter = rateLimit({
	windowMs: ENV.RATE_LIMIT_WINDOW_TIME,
	limit: ENV.RATE_LIMIT_REQUESTS,
	standardHeaders: ENV.RATE_LIMIT_HEADER,
	legacyHeaders: ENV.RATE_LIMIT_LEGACY_HEADER,
  statusCode: ENV.RATE_LIMIT_STATUS_CODE,
  requestPropertyName: ENV.RATE_LIMIT_PROP_NAME
})

app.use(limiter)

/**
 * Setup server.
*/
interface MyContext {
  token?: String;
}

const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const starter = async () => {
  await server.start()

  app.use(bodyParser.json())

  app.use(
    `${ENV.GQL_ENDPOINT}`,
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.authorization }),
    }),
  );

  app.use(tokenRoutes.default)
  app.use(userRoutes.default)
  app.use(propertyRoutes.default)
  app.use(propertyPhotosRoutes.default)
  app.use(videosRoutes.default)

  syncAssociations()
}
starter()

const listen = async () => await new Promise<void>((resolve) => httpServer.listen({ port: ENV.APP_PORT }, resolve))
listen()


console.log(`Running in ${ENV.NODE_ENV} mode(globalThis.__DEV__: ${globalThis.__DEV__})`);
console.log(`🚀 GQL Server ready at http://${ENV.APP_HOST}:${ENV.APP_PORT}${ENV.GQL_ENDPOINT}`);
