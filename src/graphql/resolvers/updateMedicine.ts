import { ApolloResolver } from '../../types';
import { withAuth } from '../auth';
import { MedicineDocument, MedicineModel } from '../../models/Medicine';
import { MutationUpdateMedicineArgs } from '../../graphql.types';
import { pubsub, pubsubKeys } from '../pubsub';

export const updateMedicineRaw: ApolloResolver<never, MedicineDocument | Error, MutationUpdateMedicineArgs> = async (
  _,
  { input, id }
) => {
  const { name, heal } = input;
  const entity = (await MedicineModel.findById(id)) as MedicineDocument;
  entity.name = name;
  entity.heal = heal;

  await entity.save();

  await pubsub.publish(pubsubKeys.updatedMedicine, { updatedMedicine: entity });

  return entity;
};

export const updateMedicine = withAuth(updateMedicineRaw);
