import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from '@models';

export const databaseConnect = (): Promise<{ success: boolean; alreadyHasConnection: boolean }> =>
  createConnection({
    logging: true,
    entities: [User],
    synchronize: true,
    type: 'mongodb',
    url: process.env.DATABASE_URL,
  })
    .then(() => {
      console.log('MONGO CONNECTED');
      return { success: true, alreadyHasConnection: false };
    })
    .catch(e => {
      console.log(e.name);
      if (e.name === 'AlreadyHasActiveConnectionError') {
        return { success: true, alreadyHasConnection: true };
      }
      return { success: false, alreadyHasConnection: false };
    });
