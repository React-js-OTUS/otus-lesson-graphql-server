import { DateScalar } from './scalars/DateScalar';
import { ProfileMutations, ProfilePasswordMutations, profile } from './resolvers/profile';
import { users } from './resolvers/users';
import { Animal } from './resolvers/Animal';
import { AnimalDocument } from '../models/Animal';
import { animals } from './resolvers/animals';
import { diseases } from './resolvers/diseases';
import { medicines } from './resolvers/medicines';
import { addAnimal } from './resolvers/addAnimal';
import { addDisease } from './resolvers/addDisease';
import { addMedicine } from './resolvers/addMedicine';
import { updateAnimal } from './resolvers/updateAnimal';
import { updateMedicine } from './resolvers/updateMedicine';
import { updateDisease } from './resolvers/updateDisease';

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
    addAnimal,
    addDisease,
    addMedicine,
    updateAnimal,
    updateDisease,
    updateMedicine,
  },
  Query: {
    animals,
    diseases,
    medicines,
    profile,
    users,
  },
};
