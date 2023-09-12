import { AccountResponse, Messages, ResolverWithoutParent } from '../../types';
import { GraphQLError } from 'graphql/index';

export const withAuth =
  <Args extends Record<string, unknown>, Res = AccountResponse>(
    action: ResolverWithoutParent<Args, Res>
  ): ResolverWithoutParent<Args, Res> =>
  async (parent, args, context): Promise<Res> => {
    if (!context.user) {
      throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: Messages.JWT_ERROR,
          http: { status: 401 },
        },
      });
    }
    return action(parent, args, context);
  };
