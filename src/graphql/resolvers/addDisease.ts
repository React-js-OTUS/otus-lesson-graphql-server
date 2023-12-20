import { ApolloResolver } from '../../types';
import { withAuth } from '../auth';
import { DiseaseDocument, DiseaseModel } from '../../models/Disease';
import { MutationAddDiseaseArgs } from '../../graphql.types';
import { pubsub, pubsubKeys } from '../pubsub';

export const addDiseaseRaw: ApolloResolver<never, DiseaseDocument | Error, MutationAddDiseaseArgs> = async (
  _,
  { input }
) => {
  const { name, type, desc } = input;
  const entity = new DiseaseModel({ name, type, desc });

  await entity.save();

  await pubsub.publish(pubsubKeys.addedDisease, { addedDisease: entity });

  return entity;
};

export const addDisease = withAuth(addDiseaseRaw);
