import '../lib/register-typescript-tools';

import * as dotenv from 'dotenv';
dotenv.config();

import { Context, APIGatewayProxyEvent, APIGatewayProxyResult, Callback } from 'aws-lambda';
import { bootstrap } from './bootstrap';

export const handler = (event: APIGatewayProxyEvent, context: Context, callback: Callback<APIGatewayProxyResult>) => {
  context.callbackWaitsForEmptyEventLoop = false;
  bootstrap(event, context, callback);
};
