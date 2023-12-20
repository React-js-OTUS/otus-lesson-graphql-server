import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

export const pubsubKeys = {
  addedAnimal: 'addedAnimal',
  addedUser: 'addedUser',
  addedMedicine: 'addedMedicine',
  addedDisease: 'addedDisease',

  updatedAnimal: 'updatedAnimal',
  updatedUser: 'updatedUser',
  updatedMedicine: 'updatedMedicine',
  updatedDisease: 'updatedDisease',

  removedAnimal: 'removedAnimal',
  removedUser: 'removedUser',
  removedMedicine: 'removedMedicine',
  removedDisease: 'removedDisease',
};
