import { ObjectId } from 'bson';
import { AllObjectIdsToString } from '../utils/utilityTypes';

export interface UserInDB {
  userId: ObjectId;
  name: string;
  email: string;
  googleId: string;

  isDeleted: boolean;
  // auto generated
  _id: ObjectId;
  created_at: Date;
  updated_at: Date;
}
export type UserResponse = AllObjectIdsToString<Omit<UserInDB, '_id' | '__v'>>;
