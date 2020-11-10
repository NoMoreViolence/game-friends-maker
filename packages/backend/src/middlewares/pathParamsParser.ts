import { chain, mapValues } from 'lodash';
import { Middleware } from 'utils/applyMiddlewares';
import { badRequest } from 'utils/httpResponses';
import * as Yup from 'yup';

export const pathParamsParser = <T extends object>(
  yupSchema: Yup.ObjectSchema<Yup.Shape<object | undefined, T>>,
): Middleware<{ pathParams: T }, {}, {}, {}> => (handler) => async (
  event,
  context,
  callback,
) => {
  const pathParams = event.pathParameters
    ? mapValues(event.pathParameters, (pathParam) => decodeURI(pathParam))
    : {};

  try {
    const castedPathParams = yupSchema.validateSync(pathParams, {
      abortEarly: false,
      strict: false,
      stripUnknown: true,
    }) as T;
    return handler(
      {
        ...event,
        pathParams: castedPathParams,
      },
      context,
      callback,
    );
  } catch (validationError) {
    return badRequest(
      'InvalidPathParams',
      chain(validationError).pick('errors', 'inner').value(),
    );
  }
};
