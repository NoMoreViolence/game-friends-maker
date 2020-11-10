import { retryPromise } from 'co-hope-common-server';
import { ENV } from 'constants/ENV';
import mongoose from 'mongoose';

export async function ensureMongooseConnection(poolSize = 5) {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (
    mongoose.connection.readyState === 1 ||
    mongoose.connection.readyState === 2
  ) {
    // already connected to mongoDB
    return 'DONE';
  }
  // not connected to mongoDB
  await retryPromise()(() =>
    mongoose.connect(ENV.DATABASE_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
      poolSize,
      connectTimeoutMS: 5000,
      loggerLevel: 'info',
    }),
  );
  return 'DONE';
}
