import { ApolloResolver } from '../../types';
import { withAuth } from '../auth';
import { MedicineDocument, MedicineModel } from '../../models/Medicine';
import { MutationAddMedicineArgs } from '../../graphql.types';
import { pubsub, pubsubKeys } from '../pubsub';

export const addMedicineRaw: ApolloResolver<never, MedicineDocument | Error, MutationAddMedicineArgs> = async (
  _,
  { input }
) => {
  const { name, heal } = input;
  const entity = new MedicineModel({ name, heal });

  await entity.save();

  await pubsub.publish(pubsubKeys.addedMedicine, { addedMedicine: entity });

  return entity;
};

export const addMedicine = withAuth(addMedicineRaw);
