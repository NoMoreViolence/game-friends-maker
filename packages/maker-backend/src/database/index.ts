import mongoose from 'mongoose';

export const dbConnect = async (): Promise<{ success: boolean; alreadyHasConnection: boolean }> => {
  if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
    return { success: true, alreadyHasConnection: true };
  }

  const result = await mongoose
    .connect(process.env.DATABASE_URL as string, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => ({ success: true, alreadyHasConnection: false }))
    .catch(() => ({ success: false, alreadyHasConnection: false }));
  return result;
};
