import { ApolloResolver } from '../../types';
import { withAuth } from '../auth';
import { DiseaseDocument, DiseaseModel } from '../../models/Disease';
import { MutationUpdateDiseaseArgs } from '../../graphql.types';
import { pubsub, pubsubKeys } from '../pubsub';

export const updateDiseaseRaw: ApolloResolver<never, DiseaseDocument | Error, MutationUpdateDiseaseArgs> = async (
  _,
  { input, id }
) => {
  const { name, type, desc } = input;
  const entity = (await DiseaseModel.findById(id)) as DiseaseDocument;
  entity.name = name;
  entity.desc = desc;
  entity.type = type;

  await entity.save();

  await pubsub.publish(pubsubKeys.updatedDisease, { updatedDisease: entity });

  return entity;
};

export const updateDisease = withAuth(updateDiseaseRaw);
