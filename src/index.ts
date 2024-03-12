import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';
import http from 'http';

/** GraphQL */
import { resolvers } from '@/schema/resolvers/index.js';
import { typeDefs } from '@/schema/typeDefs/index.js';

/** Database */

/** Routes */
import * as userRoutes from '@/routes/user.route';

/** Test */
import helloWorldDefault, { helloWorld } from '@/helpers';
import bodyParser from 'body-parser';

helloWorld()
helloWorldDefault()

const PORT = 3001

/**
 * Crate Express server with GraphQL Apollo Server.
*/
interface MyContext {
  token?: String;
}

const app = express();

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

const listen = async () => await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve))
listen()

console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);