import mongoose from 'mongoose';
import { ENV } from 'constants/ENV';

export async function ensureMongooseConnection(poolSize = 10) {
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (
    mongoose.connection.readyState === 1 ||
    mongoose.connection.readyState === 2
  ) {
    // already connected to mongoDB
    return 'DONE';
  }
  // not connected to mongoDB
  await mongoose.connect(ENV.DATABASE_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    poolSize,
    connectTimeoutMS: 5000,
    loggerLevel: 'info',
  });
  return 'DONE';
}
