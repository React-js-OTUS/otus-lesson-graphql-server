import { ApolloResolver } from '../../../types';
import { withAuth } from '../auth';
import { AnimalDocument, AnimalModel } from '../../models/Animal';
import { MutationUpdateAnimalArgs } from '../../graphql.types';

export const updateAnimalRaw: ApolloResolver<never, AnimalDocument | Error, MutationUpdateAnimalArgs> = async (
  _,
  { input, id }
) => {
  const { name, comment, type, doctorId, diseaseIds, age } = input;
  const entity = (await AnimalModel.findById(id)) as AnimalDocument;
  entity.name = name;
  entity.comment = comment;
  entity.type = type;
  entity.doctorId = doctorId;
  entity.diseaseIds = diseaseIds;
  entity.age = age;

  await entity.save();

  return entity;
};

export const updateAnimal = withAuth(updateAnimalRaw);
