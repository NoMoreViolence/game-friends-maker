import 'lib/registerTypescriptTools';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { mongooseConnector } from 'middlewares/mongooseConnector';
import { applyMiddlewares } from 'utils/applyMiddlewares';
import { ok } from 'utils/httpResponses';

export const handler: APIGatewayProxyHandler = applyMiddlewares(
  mongooseConnector,
)(async (_event, _context, _callback) => {
  return ok('application', {});
});
