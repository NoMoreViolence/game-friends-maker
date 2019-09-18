import 'reflect-metadata';
import mongoose from 'mongoose';

export const dbConnect = (): Promise<{ success: boolean; alreadyHasConnection: boolean }> =>
  new Promise(resolve => {
    console.log(mongoose.connection.readyState);
    if (mongoose.connection.readyState === 1) {
      return resolve({ success: true, alreadyHasConnection: true });
    }

    mongoose
      .connect(process.env.DATABASE_URL as string)
      .then(() => resolve({ success: true, alreadyHasConnection: false }))
      .catch(() => resolve({ success: true, alreadyHasConnection: false }));
  });
