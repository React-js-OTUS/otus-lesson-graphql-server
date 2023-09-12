import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Disease as DiseaseType } from '../../graphql.types';
import { DiseaseTypeField } from '../fields/DiseaseTypeField';

export type DiseaseDocument = Document & DiseaseType;

export const DiseaseSchema = new mongoose.Schema<DiseaseDocument>({
  name: String,
  desc: String,
  type: DiseaseTypeField,
});

export const DiseaseModel = mongoose.model('Disease', DiseaseSchema);
