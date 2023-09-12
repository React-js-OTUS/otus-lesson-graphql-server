import { ResolverWithoutParent } from '../../../types';
import { User } from '../../graphql.types';
import { withAuth } from '../auth';
import { getOnlineUsers } from '../onlineUsers';
import { prepareUsers } from '../../models/helpers/prepareUser';

export const usersRaw: ResolverWithoutParent<never, User[] | Error> = async () => prepareUsers(getOnlineUsers());

export const users = withAuth(usersRaw);
