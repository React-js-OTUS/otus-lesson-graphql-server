import { ResolverWithoutParent } from '../../../../types';
import { Profile } from '../../../graphql.types';
import { withAuth } from '../../auth';

export const profileRaw: ResolverWithoutParent<never, Profile | Error> = async (_, __, { user }) => user;
export const profile = withAuth(profileRaw);
