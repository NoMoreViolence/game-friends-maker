import { connect } from 'mongoose';
import 'reflect-metadata';
const { DATABASE_URL } = process.env;

export default connect(DATABASE_URL as string)
  .then(() => {
    console.log('MONGO DB CONNECTED', DATABASE_URL);
    return true;
  })
  .catch(() => {
    console.log('MONGO DB CONNECT FAILURE', DATABASE_URL);
    return false;
  });
