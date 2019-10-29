import 'reflect-metadata';
import mongoose from 'mongoose';

export const dbConnect = (): Promise<{ success: boolean }> =>
  new Promise(resolve => {
    if (mongoose.connection.readyState === 1) {
      return resolve({ success: true });
    }

    mongoose
      .connect(
        process.env.NODE_ENV === 'prod'
          ? (process.env.PROD_DATABASE_URL as string)
          : (process.env.DEV_DATABASE_URL as string),
        {
          useCreateIndex: true,
          useUnifiedTopology: true,
          useNewUrlParser: true,
        },
      )
      .then(() => resolve({ success: true }))
      .catch(() => resolve({ success: false }));
  });
