import { ApolloServer } from '@apollo/server';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import * as http from 'http';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

export const AUTHENTICATION_TYPE = 'Bearer';
const regexpForRemoveAuthenticationType = new RegExp(`^${AUTHENTICATION_TYPE}\\s`);
const getToken = (authentication: string): string => authentication?.replace(regexpForRemoveAuthenticationType, '');

export const createServer = async (httpServer: http.Server, port: number) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      // Get the user token from the headers.
      const { authorization } = (req.headers || {}) as { authorization: string; locale: string };
      const token = getToken(authorization);

      return { token };
    },
    listen: {
      port,
    },
  });
  return {
    server,
    url,
  };
};
