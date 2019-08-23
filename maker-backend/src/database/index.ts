import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from '@models';

export const databaseConnect = (): Promise<{ success: boolean; alreadyHasConnection: boolean }> =>
  createConnection({
    entities: [User],
    database: process.env.DATABASE,
    logging: true,
    synchronize: true,
    port: 27017,
    type: 'mongodb',
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
