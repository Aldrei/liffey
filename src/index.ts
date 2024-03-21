import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';

import fs from 'fs';

/** GraphQL */
import { resolvers } from '@/schemas/resolvers';
import { typeDefs } from '@/schemas/typeDefs';

/** Routes */
import * as userRoutes from '@/routes/user.route';

/** Check Environment */
import ENV from '@/config';
import { isDev } from '@/helpers';
import path from 'path';

(globalThis as any).__DEV__ = isDev();

/**
 * Crate Express server with GraphQL Apollo Server.
*/
interface MyContext {
  token?: String;
}

const app = express();

/**
 * Write logs.
*/
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/dev.log'), { flags: 'a' })

accessLogStream.on('error', (err) => {
  console.error('### LOG STREAM ERROR: Error writing to dev.log:', err);
})

app.use(morgan('common', { stream: accessLogStream }))

const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const starter = async () => {
  await server.start()

  /**
   * Routes and Middlewares.
  */
  app.use(bodyParser.json())

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  app.use(userRoutes.default)
}
starter()

const listen = async () => await new Promise<void>((resolve) => httpServer.listen({ port: ENV.APP_PORT }, resolve))
listen()


console.log(`Running in ${ENV.NODE_ENV} mode(globalThis.__DEV__: ${globalThis.__DEV__})`);
console.log(`🚀 Server ready at http://localhost:${ENV.APP_PORT}/graphql`);

