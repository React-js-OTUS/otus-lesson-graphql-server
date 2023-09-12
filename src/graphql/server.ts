import { ApolloServer } from '@apollo/server';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import * as http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { getParamsFromToken } from '../utils/helpers';
import { AccountJWTParams } from './account';
import { UserDocument, UserModel } from '../models/User';
import { addOnlineUser, removeOnlineUser } from './onlineUsers';
import express from 'express';
import { ApolloContext, Messages } from '../types';
import { GraphQLError } from 'graphql';

export const AUTHENTICATION_TYPE = 'Bearer';
const regexpForRemoveAuthenticationType = new RegExp(`^${AUTHENTICATION_TYPE}\\s`);
export const getToken = (authentication: string): string =>
  authentication?.replace(regexpForRemoveAuthenticationType, '');

export const options = {
  context: async ({ req }: { req: express.Request }): Promise<ApolloContext> => {
    const { authorization } = (req.headers || {}) as { authorization: string; locale: string };
    const token = getToken(authorization);
    if (!token) return { token: null, user: null };
    try {
      const res = await getParamsFromToken<AccountJWTParams>(token);
      const id = res.id;
      const user = (await UserModel.findById(id)) as UserDocument;
      return { token, user };
    } catch (e) {
      return { token: null, user: null };
    }
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const createServer = async (httpServer: http.Server) => {
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/subscriptions',
  });
  const serverCleanup = useServer(
    {
      schema,
      onConnect: async (ctx) => {
        const { authorization } = ctx.connectionParams;
        const token = getToken(authorization as string);
        if (!token) {
          throw new GraphQLError('token is required', {
            extensions: {
              code: Messages.JWT_ERROR,
              http: { status: 401 },
            },
          });
        }
        const res = await getParamsFromToken<AccountJWTParams>(token);
        const id = res.id;
        const user = (await UserModel.findById(id)) as UserDocument;
        addOnlineUser(user);
      },
      onDisconnect: async (ctx) => {
        const { authorization } = ctx.connectionParams;
        const token = getToken(authorization as string);
        if (!token) return;
        const res = await getParamsFromToken<AccountJWTParams>(token);
        const id = res.id;
        const user = (await UserModel.findById(id)) as UserDocument;
        removeOnlineUser(user);
      },
    },
    wsServer
  );

  const server = new ApolloServer({
    schema,
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

  await server.start();

  return { server };
};
