import { Error } from 'mongoose';
import { APIGatewayProxyResult } from 'aws-lambda';

interface Paging {
  offset: number;
  limit: number;
  total: number;
}

// ---- OK (200) ----
export function ok(
  dataKey: string,
  data: any,
  paging?: Paging,
  warning?: string,
): APIGatewayProxyResult {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      ok: true,
      [dataKey]: data,
      paging,
      warning,
    }),
  };
}

// ---- Bad Request (400) ----
export enum BadRequestMessage {
  InvalidParams = 400100,
  InvalidJsonRequestBody = 400101,
  InvalidPathParams = 400102,
  InvalidQueryParams = 400103,
  InvalidBodyParams = 400104,
  ResourceNotFound = 400200,
  ResourceAlreadyExists = 400201,
  UnAuthorized = 400300,
}
export const badRequest = (
  message: keyof typeof BadRequestMessage,
  details?: object,
) => {
  const bodyObject = {
    ok: false,
    code: BadRequestMessage[message],
    message,
    details,
  };
  const errorResponse = {
    statusCode: 400,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(bodyObject),
  };
  console.log({ ...errorResponse, body: bodyObject });
  return errorResponse;
};
export const invalidParams = (validationError: Error.ValidationError) =>
  badRequest('InvalidParams', validationError.errors);

// ---- Internal Server Error (500) ----
export enum InternalServerErrorMessage {
  UnexpectedException = 500000,
}
export const internalError = (
  message: keyof typeof InternalServerErrorMessage,
  details?: object,
) => {
  const bodyObject = {
    ok: false,
    code: InternalServerErrorMessage[message],
    message,
    details,
  };
  const errorResponse = {
    statusCode: 500,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(bodyObject),
  };
  console.log({ ...errorResponse, body: bodyObject });
  return errorResponse;
};
