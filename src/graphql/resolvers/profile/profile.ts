import { ResolverWithoutParent } from '../../../../types';
import { Profile } from '../../../graphql.types';

export const profile: ResolverWithoutParent<never, Profile | Error> = async (_, __, { user }) => user;
