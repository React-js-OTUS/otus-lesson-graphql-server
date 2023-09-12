import { DateScalar } from './scalars/DateScalar';
import { ProfileMutations, ProfilePasswordMutations, profile } from './resolvers/profile';
import { users } from './resolvers/users';
import { Animal } from './resolvers/Animal';
import { AnimalDocument } from '../models/Animal';

export const resolvers = {
  Date: DateScalar,

  ProfileMutations,
  ProfilePasswordMutations,

  Animal: {
    __resolveType: (obj: AnimalDocument) => obj?.type,
  },

  Bird: Animal,
  Dog: Animal,
  Cat: Animal,

  Mutation: {
    profile: () => ({}),
  },
  Query: {
    profile,
    users,
  },
};
