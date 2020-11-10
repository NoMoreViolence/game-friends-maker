import { chain } from 'lodash';
import { Middleware } from 'utils/applyMiddlewares';
import { badRequest } from 'utils/httpResponses';
import * as Yup from 'yup';

export const queryParamsParser = <T extends object>(
  yupSchema: Yup.ObjectSchema<Yup.Shape<object | undefined, T>>,
): Middleware<{ queryParams: T }, {}, {}, {}> => (handler) => async (
  event,
  context,
  callback,
) => {
  const queryParams = event.queryStringParameters || {};

  try {
    const castedQueryParams = yupSchema.validateSync(queryParams, {
      abortEarly: false,
      strict: false,
      stripUnknown: true,
    }) as T;
    return handler(
      {
        ...event,
        queryParams: castedQueryParams,
      },
      context,
      callback,
    );
  } catch (validationError) {
    return badRequest(
      'InvalidQueryParams',
      chain(validationError).pick('errors', 'inner').value(),
    );
  }
};
