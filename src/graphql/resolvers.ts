import { DateScalar } from './scalars/DateScalar';
import { ProfileMutations, ProfilePasswordMutations, profile } from './resolvers/profile';
import { users } from './resolvers/users';

export const resolvers = {
  Date: DateScalar,

  ProfileMutations,
  ProfilePasswordMutations,

  Mutation: {
    profile: () => ({}),
  },
  Query: {
    profile,
    users,
  },
};
