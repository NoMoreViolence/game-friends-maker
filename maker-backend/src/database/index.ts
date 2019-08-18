import { connect } from 'mongoose';
import 'reflect-metadata';

export const databaseConnect = () =>
  connect(process.env.DATABASE_URL as string)
    .then(() => {
      console.log('MONGO DB CONNECTED', process.env.DATABASE_URL as string);
      return true;
    })
    .catch(() => {
      console.log('MONGO DB CONNECT FAILURE', process.env.DATABASE_URL as string);
      return false;
    });
