import * as mongoose from 'mongoose';
import { Document, Model } from 'mongoose';
import { generateHash, isValidCode, isValidEmail, isValidNickname } from './helpers';
import { ResetPassword } from './ResetPassword';
import { Profile } from '../../graphql.types';

export type ResetPassword = {
  code: string;
  deadline: number;
};

export type UserMain = Profile & {
  password: string;
  resetPassword: ResetPassword;
};

export type UserClient = Pick<UserMain, 'name'>;

export type UserMethods = {
  generateHash: (password: string) => Promise<string>;
  isRightPassword: (password: string) => boolean;
};

export type UserNative = UserMain & UserMethods;

export type UserDocument = Document & UserNative;

export type UserType = Model<UserDocument>;

export const UserSchema = new mongoose.Schema<UserDocument>({
  name: {
    type: String,
    validate: {
      validator: isValidNickname,
      message: (props): string => `"${props.value}" is not valid nickname`,
    },
  },
  email: {
    unique: true,
    required: true,
    type: String,
    validate: {
      validator: isValidEmail,
      message: (props): string => `"${props.value}" is not valid email`,
    },
  },
  password: {
    required: true,
    type: String,
  },
  signUpDate: {
    required: true,
    type: Date,
    default: () => new Date(),
  },
  resetPassword: {
    type: ResetPassword,
    default: {
      code: null,
      deadline: null,
    },
  },
});

const methods: UserMethods = {
  generateHash,
  isRightPassword(password: string) {
    return isValidCode(password, this.password);
  },
};

Object.assign(UserSchema.methods, methods);

export const UserModel = mongoose.model('User', UserSchema);
