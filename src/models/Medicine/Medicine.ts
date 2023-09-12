import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Medicine as MedicineType } from '../../graphql.types';
import { DiseaseTypeField } from '../fields/DiseaseTypeField';
import { pubsub, pubsubKeys } from '../../graphql/pubsub';

export type MedicineDocument = Document & MedicineType;

export const MedicineSchema = new mongoose.Schema<MedicineDocument>({
  name: String,
  heal: [DiseaseTypeField],
});

MedicineSchema.post('save', (doc) => pubsub.publish(pubsubKeys.updatedMedicine, doc));

export const MedicineModel = mongoose.model('Medicine', MedicineSchema);
