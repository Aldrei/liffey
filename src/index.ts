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
import { bannerRoutes, cityRoutes, messageRoutes, neighborhoodRoutes, ownerRoutes, propertiesAgenciesRoutes, propertyPhotosRoutes, propertyRoutes, userRoutes, videosRoutes } from '@/routes/api/rest/guard';
import { publicMessageRoutes, publicPropertyAgencyRoutes, publicTokenRoutes } from '@/routes/api/rest/public';

/** Check Environment */
import ENV from '@/config';
import { syncAssociations } from '@/database/sync/associations';
import { getLocalhost, isDev, isGqlReferer } from '@/helpers';
import { validGuardRouteTokenService, validPublicRouteTokenService } from '@/services/auth';
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
 * Serve static files
*/
app.use(express.static('public'));

/**
 * Authentication for GraphQL API.
*/
app.use((req: Request, res: Response, next: NextFunction) => {
  const { origin, referer } = req.headers

  const DOMAINS = ENV.CORS_DOMAINS.split(',') as string[]
  if (isDev()) DOMAINS.push(getLocalhost())

  if (isGqlReferer(referer) && !DOMAINS.includes(origin))
    return res.status(401).json({ error: 'Forbidden. Origin unauthorized for this GraphQL referer.' })

  res.header('Access-Control-Allow-Origin', origin)
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  return next()
})

/**
 * Authentication for REST API.
*/
const REST_WHITE_LIST = [ENV.GQL_ENDPOINT, '/oauth/access_token', '/api/pub/', '/images/', '/favicon.ico']

app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { originalUrl } = req

    for (const route of REST_WHITE_LIST) {
      if (originalUrl.indexOf(route) > -1) return next()
    }

    const { error } = await validGuardRouteTokenService(req)
    if (error) throw Error(error)

    return next()
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error.message })
  }
})

/**
 * Authentication for REST API to public routes.
*/
app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { originalUrl } = req
    const { authorization } = req.headers

    if (originalUrl.indexOf('/api/pub/') > -1) {
      const { error } = await validPublicRouteTokenService(authorization)
      if (error) throw Error(`Public: ${error}`)
    }

    return next()
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error.message })
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

  // Private Routes
  app.use(userRoutes.default)
  app.use(propertyRoutes.default)
  app.use(propertyPhotosRoutes.default)
  app.use(videosRoutes.default)
  app.use(ownerRoutes.default)
  app.use(cityRoutes.default)
  app.use(neighborhoodRoutes.default)
  app.use(bannerRoutes.default)
  app.use(messageRoutes.default)
  app.use(propertiesAgenciesRoutes.default)

  // Public routes
  app.use(publicTokenRoutes.default)
  app.use(publicMessageRoutes.default)
  app.use(publicPropertyAgencyRoutes.default)

  syncAssociations()
}
starter()

const listen = async () => await new Promise<void>((resolve) => httpServer.listen({ port: ENV.APP_PORT }, resolve))
listen()


console.log(`Running in ${ENV.NODE_ENV} mode(globalThis.__DEV__: ${globalThis.__DEV__})`);
console.log(`🚀 GQL Server ready at http://${ENV.APP_HOST}:${ENV.APP_PORT}${ENV.GQL_ENDPOINT}`);
