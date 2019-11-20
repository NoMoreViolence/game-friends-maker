import { ContextFunction } from 'apollo-server-core';
import { decodeToken } from '@helpers';

export interface Context {
  session: Session;
}
export interface Session {
  _id?: string;
}

const getToken = (header: string) => header.split('Bearer ')[1];

export const injectId: ContextFunction<unknown, Context> = async ({ event }): Promise<Context> => {
  const session: Session = {};
  const authorization = event.headers.Authorization || event.headers.authorization || '';

  try {
    session._id = decodeToken(getToken(authorization)).data._id;
  } catch (e) {
    console.error(e);
  }

  return { session };
};
