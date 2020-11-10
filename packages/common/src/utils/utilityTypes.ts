import { ObjectId } from 'bson';

export type AllObjectIdsToString<T> = {
  [K in keyof T]: T[K] extends ObjectId | undefined
    ? string
    : T[K] extends Date | undefined
    ? Date
    : T[K] extends {}
    ? AllObjectIdsToString<T[K]>
    : T[K];
};
