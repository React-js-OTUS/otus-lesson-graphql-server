import { UserDocument } from '../User';
import { User } from '../../graphql.types';

export const prepareUser = (item: UserDocument): User =>
  item && {
    id: item._id,
    name: item.name,
    signUpDate: item.signUpDate,
  };

export const prepareUsers = (items: UserDocument[]): User[] => items?.map(prepareUser);
