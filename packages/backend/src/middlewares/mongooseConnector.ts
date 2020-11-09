import { Middleware } from 'utils/applyMiddlewares';
import { ensureMongooseConnection } from 'utils/mongoConnection';

export const mongooseConnector: Middleware<{
  isMongoDBConnected: true;
}> = (handler) => async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await ensureMongooseConnection();
  return handler({ ...event, isMongoDBConnected: true }, context, callback);
};
