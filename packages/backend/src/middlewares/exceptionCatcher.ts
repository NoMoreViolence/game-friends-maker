import { Middleware } from 'utils/applyMiddlewares';
import { internalError } from 'utils/httpResponses';

// catch 'uncaughtException' or 'unhandledRejection' and return formatted error response
export const exceptionCatcher: Middleware = (handler) => async (
  event,
  context,
  callback,
) => {
  try {
    const response = await handler(event, context, callback);
    return response;
  } catch (error) {
    console.error(error); // for cloudwatch logging
    return internalError('UnexpectedException', { hint: error.message });
  }
};
