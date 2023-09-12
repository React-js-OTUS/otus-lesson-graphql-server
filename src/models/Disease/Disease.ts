import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Disease as DiseaseType } from '../../graphql.types';
import { DiseaseTypeField } from '../fields/DiseaseTypeField';
import { pubsub, pubsubKeys } from '../../graphql/pubsub';

export type DiseaseDocument = Document & DiseaseType;

export const DiseaseSchema = new mongoose.Schema<DiseaseDocument>({
  name: String,
  desc: String,
  type: DiseaseTypeField,
});

DiseaseSchema.post('save', (doc) => pubsub.publish(pubsubKeys.updatedDisease, doc));

export const DiseaseModel = mongoose.model('Disease', DiseaseSchema);
