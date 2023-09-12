import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Animal as AnimalType, AnimalType as AnimalTypeEnum } from '../../graphql.types';
import { AnimalTypeField } from '../fields/AnimalTypeField';
import { pubsub, pubsubKeys } from '../../graphql/pubsub';

export type AnimalSchemaType = Omit<AnimalType, 'doctor' | 'disease'> & {
  diseaseIds?: string[];
  doctorId?: string;
  type: AnimalTypeEnum;
};

export type AnimalDocument = Document & AnimalSchemaType;

export const AnimalSchema = new mongoose.Schema<AnimalDocument>({
  age: Number,
  name: String,
  comment: String,
  doctorId: String,
  diseaseIds: [String],
  type: AnimalTypeField,
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
});

AnimalSchema.post('save', (doc) => pubsub.publish(pubsubKeys.updatedAnimal, doc));

export const AnimalModel = mongoose.model('Animal', AnimalSchema);
