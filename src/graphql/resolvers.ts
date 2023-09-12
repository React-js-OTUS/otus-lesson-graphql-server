import { DateScalar } from './scalars/DateScalar';
import { ProfileMutations, ProfilePasswordMutations, profile } from './resolvers/profile';
import { users } from './resolvers/users';
import { Animal } from './resolvers/Animal';
import { AnimalDocument } from '../models/Animal';
import { animals } from './resolvers/animals';
import { diseases } from './resolvers/diseases';
import { medicines } from './resolvers/medicines';

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
    animals,
    diseases,
    medicines,
    profile,
    users,
  },
};
