import { ApolloServer } from '@apollo/server';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { GraphQLError } from 'graphql';
import * as http from 'http';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { getParamsFromToken } from '../utils/helpers';
import { AccountJWTParams } from './account';
import { UserDocument, UserModel } from '../models/User';
import { Messages } from '../../types';
import { addOnlineUser } from './onlineUsers';

export const AUTHENTICATION_TYPE = 'Bearer';
const regexpForRemoveAuthenticationType = new RegExp(`^${AUTHENTICATION_TYPE}\\s`);
const getToken = (authentication: string): string => authentication?.replace(regexpForRemoveAuthenticationType, '');

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const createServer = async (httpServer: http.Server, port: number) => {
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/subscriptions',
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      try {
        const { authorization } = (req.headers || {}) as { authorization: string; locale: string };
        const token = getToken(authorization);
        const res = await getParamsFromToken<AccountJWTParams>(token);
        const id = res.id;
        const user = (await UserModel.findById(id)) as UserDocument;
        addOnlineUser(user);
        return { token, user };
      } catch {
        return { token: null, user: null };
      }
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
