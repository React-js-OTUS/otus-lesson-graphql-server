import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Medicine as MedicineType } from '../../graphql.types';
import { DiseaseTypeField } from '../fields/DiseaseTypeField';

export type MedicineDocument = Document & MedicineType;

export const MedicineSchema = new mongoose.Schema<MedicineDocument>({
  name: String,
  heal: [DiseaseTypeField],
});

export const MedicineModel = mongoose.model('Medicine', MedicineSchema);
