/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { ITask } from '../task/task.interface';

export type IUser = {
  name: string;
  email: string;
  avatar?: string | null;
  role: string;
  password: string;
  id?: string;
  _id?: string;
  tasks?: ITask[];
};
export type IUserFilters = {
  searchTerm?: string;

  bloodGroup?: string;
  email?: string;
  name?: string;
  role?: string;
  userStatus?: boolean;
};

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<
    Pick<
      IUser,
      'password' | 'role' | 'email' | '_id' | 'id' | 'avatar' | 'name'
    >
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
